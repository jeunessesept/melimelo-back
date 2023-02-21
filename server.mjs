import express from 'express'    
import dotenv from 'dotenv' 
dotenv.config() 

const server = express()    
server.use(express.json()) 


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

  console.log(process.env)

  
const DB_PORT = process.env.DB_PORT
 server.listen(DB_PORT, () => {console.log(`server connected on ${DB_PORT}`)}) 