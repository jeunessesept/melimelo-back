import express  from "express";

const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    res.status(200).send("<h1> hello welcome to MeliMelo </h1>")
})

server.listen(3001, () => {
    console.log("connected")
})