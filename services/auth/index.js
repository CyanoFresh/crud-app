const argon2 = require('argon2');
const authenticatedHandler = require('../authenticatedHandler');
const { User } = require('../../models');
const config = require('../../config');

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
  preHandler: [authenticatedHandler],
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

    reply.setCookie('token', 'lol_this_token_is_secure', {
      httpOnly: true,
      sameSite: true,
      path: '/',
      maxAge: request.body.rememberMe && config.auth.maxAge,
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
    reply.clearCookie('token', {
      path: '/',
    });

    return { ok: true };
  });
}

module.exports = routes;
