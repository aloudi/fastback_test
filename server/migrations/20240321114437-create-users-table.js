'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    );

    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
          },

          email: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false,
          },

          password: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },

          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },

          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
          },
        },
        {
          timestamps: true,
          transaction,
        },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "Users";
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  },
};
