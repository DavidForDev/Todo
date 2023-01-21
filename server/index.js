const express = require("express");
const server = express();

server.get("/test", (req, res) => {
  res.json({ name: "lora" });
});

module.exports = server;
