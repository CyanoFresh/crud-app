async function routes(fastify, options) {
  fastify.post('/auth/login', async (request, reply) => {
    return { hello: 'world' };
  });
}

module.exports = routes;
