module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
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
