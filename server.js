const express = require("express");
const server = express();
const helmet = require("helmet");
const protected = require("./auth/restricted-middleware");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`It's working!`);
});

server.use("/auth", authRouter);
server.use("/users", protected, usersRouter);

module.exports = server;
