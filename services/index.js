const authenticatedHandler = require('./auth/preHandler');

module.exports = async (fastify, opts) => {
  fastify.register(require('./auth'));

  fastify.register((fastify, opts, done) => {
    fastify.addHook('preHandler', authenticatedHandler);

    fastify.register(require('./users', opts));

    Object.keys(opts.app.modules).forEach(moduleId => {
      opts.app.modules[moduleId].routes(fastify);
    });

    done();
  }, opts);
};
