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
}

module.exports = routes;
