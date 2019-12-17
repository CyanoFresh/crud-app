class Variable {
  constructor(app) {
    this.app = app;
    this.id = 'variable';
  }

  routes(fastify) {
    fastify.get(`${this.id}`, async () => {
      return { ok: true };
    });
  }
}

module.exports = (app) => new Variable(app);
