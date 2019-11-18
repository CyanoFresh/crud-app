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

    reply.setCookie('token', 'loltokenissecure', {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    return { ok: true };
  });

  fastify.post('/auth/logout', async (request, reply) => {
    reply.clearCookie('token');

    return { ok: true };
  });
}

module.exports = routes;
