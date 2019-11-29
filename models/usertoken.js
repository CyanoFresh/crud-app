module.exports = (sequelize, DataTypes) => {
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
