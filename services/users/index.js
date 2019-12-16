const argon2 = require('argon2');
const createUser = require('./createUser');
const { User, UserToken, Sequelize } = require('../../models');

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
                isAdmin: { type: 'boolean' },
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
        attributes: ['id', 'username', 'name', 'isAdmin'],
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
        if (request.body.isAdmin && !request.user.isAdmin) {
          delete request.body.isAdmin;
        }

        const user = await createUser(request.body.username, request.body.password, request.body.name, request.body.isAdmin);

        if (!user) {
          return reply.badRequest();
        }

        return {
          ok: true,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            isAdmin: user.isAdmin,
          },
        };
      } catch (e) {
        if (e instanceof Sequelize.UniqueConstraintError) {
          return reply.badRequest('Username is not unique');
        }

        return reply.badRequest(e);
      }
    },
  );

  fastify.delete(
    '/users/:id',
    {
      required: ['id'],
      querystring: {
        id: { type: 'integer' },
      },
      body: {
        type: 'object',
        required: ['username', 'name'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          isAdmin: { type: 'boolean' },
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
    async (request, reply) => {
      const { id } = request.params;

      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'isAdmin'],
      });

      if (!user) {
        return reply.notFound();
      }

      if (user.isAdmin && !request.user.isAdmin) {
        return reply.forbidden('You are not allowed to delete admins');
      }

      await user.destroy();

      return { ok: true };
    },
  );

  fastify.put('/users/:id', {
      required: ['id'],
      querystring: {
        id: { type: 'integer' },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            ok: { type: 'boolean' },
            userId: { type: 'integer' },
          },
        },
      },
    }, async (request, reply) => {
      try {
        const { id } = request.params;

        if (request.body.isAdmin && !request.user.isAdmin) {
          delete request.body.isAdmin;
        }

        if (request.body.password) {
          request.body.password_hash = await argon2.hash(request.body.password);

          // Close all active sessions for this user
          await UserToken.destroy({ where: { UserId: id } });
        }

        const userId = await User.update(request.body, {
          where: { id },
          fields: ['username', 'name', 'isAdmin', request.body.password && 'password_hash'],
        });

        if (!userId) {
          return reply.badRequest();
        }

        return {
          ok: true,
          userId,
        };
      } catch (e) {
        if (e instanceof Sequelize.UniqueConstraintError) {
          return reply.badRequest('Username is not unique');
        }

        return reply.badRequest(e);
      }
    },
  );
}

module.exports = routes;
