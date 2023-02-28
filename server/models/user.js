"use strict";
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require('cloudinary').v2;


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
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      // get() {
      //   const imagePublicId = this.getDataValue('image');
      //   if (!imagePublicId) { return null;}
      //   return cloudinary.url(imagePublicId);
      // },
    },
  },
  {
   // sequelize,
    tableName: 'users',
    // hooks: {
    //   beforeSave: async (user) => {
    //     if (user.changed('image')) {
    //       if (user.previous('image')) {
    //         await cloudinary.uploader.destroy(user.previous('image'));
    //       }
    //       const result = await cloudinary.uploader.upload(user.image);
    //       user.image = result.public_id;
    //     }
    //   },
    // },
  }
)

sequelize.sync();

module.exports = { User };