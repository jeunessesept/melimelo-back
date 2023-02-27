'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('texts_groups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        group_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: "groups",
            key: "id",
          },
        },
        content: {
          type: Sequelize.TEXT,
          allowNull:false, 
        }, 
        created_at: {
          type: Sequelize.DATE
        },
      
        updated_at: {
          type: Sequelize.DATE
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('texts_groups');
  }
};