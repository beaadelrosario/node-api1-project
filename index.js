const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Bea Testing" });
});

const port = 5000;
server.listen(port, () => console.log("server up..."));
