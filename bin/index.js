#!/usr/bin/env node
const { sequelize } = require('../models');
const createUser = require('../services/users/createUser');

console.log('\nCRUD-APP CLI\n');

const [action, ...params] = process.argv.slice(2);

const run = async () => {
  try {
    switch (action) {
      case 'create-user':
        await sequelize
          .authenticate();

        console.log('DB connected');

        const [username, password, name, isAdmin = false] = params;

        console.log(`Creating user with username "${username}"...`);

        const user = await createUser(username, password, name, Boolean(isAdmin));

        if (user) {
          console.log('User created');
          process.exit(0);
        } else {
          console.log('User creating error');
          process.exit(1);
        }

        break;
      default:
        console.error('Unknown action: ' + action);
        process.exit(1);
        break;
    }
  } catch (e) {
    console.error('Error: ', e);
    process.exit(1);
  }
};

run();
