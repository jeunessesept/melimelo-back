import express from 'express'    
import dotenv from 'dotenv' 
dotenv.config() 
import { register } from './controllers/userControllers.mjs';
import bodyParser from "body-parser";

const server = express()    

//middleware
server.use(express.json()) 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



import Sequelize from 'sequelize' 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données établie avec succès.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données : ", err);
  });

  const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize


server.post("/user/register", register);

  
server.listen(3001, () => {console.log(`server connected on ${3001}`)}) 