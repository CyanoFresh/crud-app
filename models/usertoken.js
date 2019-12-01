module.exports = (sequelize, DataTypes) => {
  /**
   * @property {function<Promise<Model<User>>>} getUser
   */
  const UserToken = sequelize.define('UserToken', {
    token: DataTypes.STRING,
    ip: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
  }, {
    updatedAt: false,
  });
  UserToken.associate = function(models) {
    UserToken.belongsTo(models.User);
  };
  return UserToken;
};
