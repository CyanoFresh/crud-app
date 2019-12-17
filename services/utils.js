module.exports = {
  /**
   * Returns true if connection is under https protocol
   * Relies on proxy header only
   *
   * @param {HttpRequest} request
   * @returns {Boolean}
   */
  isSecureRequest(request) {
    return request.headers["x-forwarded-proto"].includes("https");
  }
};
