'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const posts = require('../seeders/mocks/posts.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        'Posts',
        posts.map((post) => ({
          id: post.id,
          userId: post.userId,
          title: post.title,
          text: post.text,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
