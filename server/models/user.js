"use strict";
const dotenv = require("dotenv");
dotenv.config();

const { Sequelize, DataTypes } = require("sequelize");

 
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
     },
    
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  },
  {
   tableName: "users" 
  }
);

sequelize.sync();

module.exports = { User };