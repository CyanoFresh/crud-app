module.exports = async (fastify) => {
  fastify.register(require('./auth'));
};
