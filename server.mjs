import express from "express";
import bodyParser from "body-parser";
import logger from "morgan"
import jwtAuthentification from "./middleware/auth.mjs"


import pkg from './controllers/userController.js';
const { register, 
  login, 
  logout,
  aboutProfile,
  textsByUser,
  getUserInfos } = pkg;

import text from './controllers/textController.js';
const {  postTextLoggedIn,
  postTextNoLogged,
  getTextInfos,} = text;

import groups from './controllers/groupsControllers.js'
const { createGroup, deleteGroup } = groups


const server = express();

///middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
server.use(logger('common'))
server.use( express.static('public'));


// server.get("/", (req, res)=> {
//   res.send("<h1> hellooooo you </h1>")
// })

/// user routes
server.post("/user/register", register);
server.post("/user/login", login)
server.get("/user/logout", logout)
server.post("/user/profile/about", aboutProfile)
server.get("/user/getpostbyuser", jwtAuthentification, textsByUser)
server.get("/user/profile/:id",jwtAuthentification, getUserInfos)

///texts routes 
server.post("/homepage/post", postTextNoLogged )
server.post("/user/post", postTextLoggedIn )
server.get("/homepage", getTextInfos)

///groups routes
server.post("/groups/creategroup", jwtAuthentification, createGroup )
server.delete("/groups/delete/:id", jwtAuthentification, deleteGroup )

const PORT = process.env.PORT || 3001;    //=> process.env.PORT => pas relié à une variable dans le .env
server.listen(PORT, async () => {
  console.log(`connected to ${ PORT } `);
});


