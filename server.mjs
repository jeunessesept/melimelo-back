import express  from "express";

const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    res.send("<h1> hello </h1>")
})

server.listen(3001, () => {
    console.log("connected")
})