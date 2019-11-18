const argon2 = require('argon2');
const { User } = require('../../models');

/**
 * @param username
 * @param password
 * @param name
 * @returns {Promise<User|null>}
 */
module.exports = async (username, password, name) => {
  const password_hash = await argon2.hash(password);

  return User.create({ username, password_hash, name });
};
