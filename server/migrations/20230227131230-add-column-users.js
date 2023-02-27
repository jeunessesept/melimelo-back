'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'about', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'username', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('users', 'about')], [queryInterface.removeColumn('users', 'username')], [queryInterface.removeColumn('users', 'password')]);
  }
};
