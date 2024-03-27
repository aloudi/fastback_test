'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('../seeders/mocks/users.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { hashPassword } = require('../src/utils/cripto.ts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const hashedUsers = await Promise.all(
        users.map(async (user) => ({
          id: user.id,
          email: user.email,
          password: await hashPassword(user.password),
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      );
      return await queryInterface.bulkInsert('Users', hashedUsers, {
        transaction,
      });
    });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
