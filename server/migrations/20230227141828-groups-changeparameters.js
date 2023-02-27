'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("groups", "group_name", {
      type: Sequelize.STRING,
      allowNull : false
    }),
    await queryInterface.changeColumn("groups", "user_id", {
      type: Sequelize.INTEGER,
      allowNull : false
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
