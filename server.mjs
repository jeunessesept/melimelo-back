import express from "express";
import Sequelize from "sequelize";
import bodyParser from "body-parser";

const server = express();
server.use(express.json());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true }))


server.get("/", (req, res) => {
  res.status(200).send("<h1> hello welcome to MeliMelo </h1>");
});

server.get('/get/test', (req, res) => { 
    res.send("<h1> hello, non je ne boude pas</h1>")
})

server.post('/post/test', (req, res) => {
    const { name, age } = req.body

    return res.json(`hello i'm ${name}, and i'm ${age}`)

    console.log(`hello i'm ${name}, and i'm ${age}`)
})

server.listen(3001, () => {
  console.log("connected");
});
