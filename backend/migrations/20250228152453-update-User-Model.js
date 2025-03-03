'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'firstname', {
      type: Sequelize.STRING, 
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'Lastname', {
      type: Sequelize.STRING, 
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'description', {
      type: Sequelize.STRING, 
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'profileImg', {
      type: Sequelize.STRING, 
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'coverImg', {
      type: Sequelize.STRING, 
      allowNull: true,
    })
    await queryInterface.addColumn('users', 'jobTitle', {
      type: Sequelize.STRING, 
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
