const argon2 = require('argon2');
const { User } = require('../../models');

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

async function routes(fastify) {
  fastify.post('/auth/login', loginOpts, async (request, reply) => {
    const user = await User.findOne({
      where: {
        username: request.body.username,
      },
    });

    if (!user) {
      throw fastify.httpErrors.unauthorized('Wrong username or password');
    }

    const passwordVerified = await argon2.verify(user.password_hash, request.body.password);

    if (!passwordVerified) {
      throw fastify.httpErrors.unauthorized('Wrong username or password');
    }

    reply.setCookie('token', 'lol_this_token_is_secure', {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      ok: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  });

  fastify.post('/auth/logout', async (request, reply) => {
    reply.clearCookie('token');

    return { ok: true };
  });
}

module.exports = routes;
