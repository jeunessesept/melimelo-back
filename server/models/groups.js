'use strict';
const dotenv = require("dotenv");
dotenv.config();

const { Sequelize, DataTypes } = require("sequelize");

 
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);


const Group = sequelize.define(
  "groups",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "users",
        key: "id",
      }
    },
    subject:{
     type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },

    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    tableName: "groups",
  }
)

sequelize.sync();

module.exports = { Group };