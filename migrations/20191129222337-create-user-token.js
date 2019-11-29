module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('UserTokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ip: {
          type: Sequelize.STRING,
        },
        userAgent: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        expiresAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex('UserTokens', ['token'], { unique: true }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserTokens');
  },
};
