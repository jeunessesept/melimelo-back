import express from "express";
import Sequelize from "sequelize";
import bodyParser from "body-parser";

import { register } from "./controllers/register.mjs"



const server = express();
server.use(express.json());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true }))


server.get("/", (req, res) => {
  res.status(200).send("<h1> hello welcome to MeliMelo </h1>");
});

server.post("/user/register", register)


server.listen(3001, () => {
  console.log("connected");
});
