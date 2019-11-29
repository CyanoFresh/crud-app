const { UserToken } = require('../models');

module.exports = async (request, reply) => {
  // TODO: support for api key
  if (!request.cookies.token) {
    return reply.unauthorized();
  }

  const userToken = await UserToken.findOne({
    where: {
      token: request.cookies.token,
    },
  });

  if (!userToken) {
    return reply.unauthorized();
  }

  if (new Date() > new Date(userToken.expiresAt)) {
    userToken.destroy();
    return reply.unauthorized();
  }
};
