const createUser = require('./createUser');
const { User } = require('../../models');

async function routes(fastify) {
  fastify.get('/users', async () => {
    const users = await User.findAll({
      attributes: ['id', 'username', 'name'],
    });

    return { ok: true, users };
  });

  fastify.get(
    '/users/:id',
    {
      required: ['id'],
      querystring: {
        id: { type: 'integer' },
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
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'username', 'name'],
      });

      if (!user) {
        return reply.notFound();
      }

      return { ok: true, user };
    },
  );

  fastify.post(
    '/users',
    {
      body: {
        type: 'object',
        required: ['username', 'password', 'name'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          isAdmin: { type: 'boolean' },
        }
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
                name: { type: 'string' },
                isAdmin: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await createUser(request.body.username, request.body.password, request.body.name, request.body.isAdmin);

        if (!user) {
          return reply.badRequest();
        }

        return { ok: true, user };
      } catch (e) {
        console.log(e);

        return reply.badRequest(e);
      }
    },
  );
}

module.exports = routes;
