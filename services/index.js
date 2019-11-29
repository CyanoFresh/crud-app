const authenticatedHandler = require('./authenticatedHandler');

module.exports = async (fastify) => {
  fastify.register(require('./auth'));

  fastify.register((fastify, opts, done) => {
    fastify.addHook('preHandler', authenticatedHandler);

    fastify.register(require('./users', opts));

    done();
  });
};
