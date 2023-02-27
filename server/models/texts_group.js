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


const TextGroup = sequelize.define(
  "texts_group",
{   
  id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  allowNull: false,
  primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model: "groups",
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull:false, 
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
    TableName: "texts_group"
  }
);

sequelize.sync();

module.exports = { TextGroup };