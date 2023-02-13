import express from "express";
import sequelize from "sequelize";
import bodyParser from "body-parser";

import { register } from "./controllers/userController.mjs";



const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.status(200).send("<h1> hello welcome to MeliMelo </h1>");
});

server.post("/user/register", register);

server.listen(3001, async () => {
    await sequelize.authenticate()
  console.log("connected");
});
