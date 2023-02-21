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

const text = sequelize.define(
  "texts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    font_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },

    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    },
  },
  {
    tableName: "texts",
  }
);

sequelize.sync();

module.exports = { text };
