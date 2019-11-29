const argon2 = require('argon2');
const { User, sequelize, UserToken } = require('../../models');
const config = require('../../config');
const generateToken = require('./generateToken');

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        rememberMe: { type: 'boolean' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          ok: { type: 'boolean' },
          error: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              username: { type: 'string' },
            },
          },
        },
      },
    },
  },
  config: {
    rateLimit: {
      max: 4,
      timeWindow: '1 minute',
    },
  },
};

const logoutOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          ok: { type: 'boolean' },
        },
      },
    },
  },
};

async function routes(fastify) {
  fastify.post('/auth/login', loginOpts, async (request, reply) => {
    const user = await User.findOne({
      where: {
        username: request.body.username,
      },
    });

    if (!user) {
      return { ok: false, error: 'Wrong username or password' };
    }

    const passwordVerified = await argon2.verify(user.password_hash, request.body.password);

    if (!passwordVerified) {
      return { ok: false, error: 'Wrong username or password' };
    }

    const token = await generateToken();

    const userToken = await user.createUserToken({
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      token,
      expiresAt: sequelize.literal(`NOW() + INTERVAL ${config.auth.maxAge} SECOND`),
    });

    reply.setCookie('token', userToken.token, {
      httpOnly: true,
      sameSite: true,
      path: '/',
      maxAge: request.body.rememberMe ? config.auth.maxAge : undefined,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    };
  });

  fastify.post('/auth/logout', logoutOpts, async (request, reply) => {
    const { token } = request.cookies;

    reply.clearCookie('token', {
      path: '/',
    });

    if (token) {
      const userToken = await UserToken.findOne({
        where: {
          token,
        },
      });

      if (userToken) {
        await userToken.destroy();
      }
    }

    return { ok: true };
  });
}

module.exports = routes;
