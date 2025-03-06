'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      type: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      reference_id: {
        type: Sequelize.INTEGER
      },
      reference_type: {
        type: Sequelize.STRING
      },
      is_read: {
        type: Sequelize.BOOLEAN
      },
      user_ID: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};