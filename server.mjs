<<<<<<< HEAD
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
=======
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan"
import jwtAuthentification from "./middleware/auth.mjs";

import pkg from './controllers/userController.js';
const { register, login, logout} = pkg;

import text from './controllers/textController.js';
const {  postTextLoggedIn,
  postTextNoLogged,
  getTextInfos,} = text;


const server = express();

///middleware
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger('common'))

/// user routes
server.post("/user/register", register);
server.post("/user/login", login)
server.get("/user/logout", logout)

///texts routes 
server.post("/homepage/post", postTextNoLogged )
server.post("/user/post", postTextLoggedIn )
server.get("/homepage", getTextInfos)


server.listen(3001, async () => {
  console.log("connected");
});
>>>>>>> f8cc4032039b33de1ab1b6e102a3490894b2f9ae
