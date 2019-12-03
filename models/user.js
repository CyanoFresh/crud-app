module.exports = (sequelize, DataTypes) => {
  /**
   * @property {function<Promise<Model<UserToken>>>} createUserToken
   */
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    api_key: DataTypes.STRING(50),
  }, {
    updatedAt: false,
  });
  User.associate = function(models) {
    User.hasMany(models.UserToken);
  };
  return User;
};
