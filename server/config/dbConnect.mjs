import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export const dbConnect = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Database connected to discover`);
    })
    .catch((err) => {
      console.log(err);
    });
};
