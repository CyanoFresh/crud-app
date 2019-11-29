module.exports = async (request, reply) => {
  if (!request.cookies.token) {
    return reply.unauthorized();
  }
};
