const crypto = require('crypto');
const config = require('../../config');

/**
 * @returns {Promise<string>}
 */
module.exports = () => new Promise((res, rej) => {
  crypto.randomBytes(config.auth.tokenLength, (err, buffer) => {
    if (err) return rej(err);

    return res(buffer.toString('hex'));
  });
});
