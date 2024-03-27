'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Posts',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
          },

          userId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'Users',
              key: 'id',
            },
          },

          title: {
            type: Sequelize.TEXT,
            allowNull: false,
          },

          text: {
            type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Posts');
  },
};
