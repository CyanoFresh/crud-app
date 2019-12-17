const tokenService = require('./tokenService');

// TODO: support for api key
module.exports = async (request, reply) => {
  const { token } = request.cookies;

  if (!token) {
    return reply.unauthorized();
  }

  request.user = await tokenService.getUserByToken(token);

  if (!request.user) {
    return reply.unauthorized();
  }
};
