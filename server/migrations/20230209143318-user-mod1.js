'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'date_register');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'date_register',
      {
        type: Sequelize.DATE,
        allowNull: false
      })
  }
};
