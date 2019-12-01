const tokenService = require('./auth/tokenService');

// TODO: support for api key
module.exports = async (request, reply) => {
  const { token } = request.cookies;

  if (!token) {
    return reply.unauthorized();
  }

  const isTokenValid = await tokenService.validateToken(token);

  if (!isTokenValid) {
    return reply.unauthorized();
  }
};
