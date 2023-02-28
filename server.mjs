import express from "express";
import bodyParser from "body-parser";
import logger from "morgan"
import jwtAuthentification from "./middleware/auth.mjs"
import fileUpload from "express-fileupload";


import pkg from './controllers/userController.js';
const { register, login, logout} = pkg;

import text from './controllers/textController.js';
const {  postTextLoggedIn,
  postTextNoLogged,
  getTextInfos,} = text;

import image from "./controllers/imageController.js";
const { uploadImage, cloudinaryConfig } = image;

const server = express();
cloudinaryConfig();

///middleware
server.use( express.static('public'));
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger('common'))
server.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

server.get("/test", (req, res)=> {
  res.send("<h1> hellooooo you </h1>")
})

/// user routes
server.post("/user/register", register);
server.post("/user/login", login)
server.get("/user/logout", logout)
server.put("/user/image", uploadImage )

///texts routes 
server.post("/homepage/post", postTextNoLogged )
server.post("/user/post", postTextLoggedIn )
server.get("/homepage", getTextInfos)


server.listen(3001, async () => {
  console.log("connected");
});
