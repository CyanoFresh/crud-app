const { User } = require('../../models');

async function routes(fastify) {
  fastify.get('/users', async () => {
    const users = await User.findAll({
      attributes: ['id', 'username', 'name'],
    });

    return { ok: true, users };
  });
}

module.exports = routes;
