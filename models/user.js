module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
  }, {
    updatedAt: false,
  });
  User.associate = function(models) {
  };
  return User;
};
