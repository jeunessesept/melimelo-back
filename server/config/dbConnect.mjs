import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();



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



export const dbConnect = async () => {
  sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})
};
