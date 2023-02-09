import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();



const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME.trim(),
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: process.env.DB_HOST,
    dialect: "postgres",
  }
);


export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
