const { UserToken } = require('../../models');
const config = require('../../config');
const crypto = require('crypto');

class TokenService {
  /**
   * @param {string} token
   * @returns {Promise<Model<UserToken>>}
   */
  async validateToken(token) {
    /**
     * @type {Model<UserToken>}
     */
    const userToken = await UserToken.findOne({
      where: { token },
      attributes: ['expiresAt', 'token', 'UserId'],
    });

    if (!userToken) {
      return null;
    }

    if (new Date() > new Date(userToken.expiresAt)) {
      userToken.destroy();
      return null;
    }

    return userToken;
  }

  /**
   * @param {string} token
   * @returns {Promise<Model<User>|null>}
   */
  async getUserByToken(token) {
    const userToken = await this.validateToken(token);

    if (!userToken) {
      return null;
    }

    return userToken.getUser();
  }

  /**
   * @returns {Promise<string>}
   */
  generateToken() {
    return new Promise((res, rej) =>
      crypto.randomBytes(config.auth.tokenLength, (err, buffer) => {
        if (err) return rej(err);

        return res(buffer.toString('hex'));
      }));
  }
}

module.exports = new TokenService();
