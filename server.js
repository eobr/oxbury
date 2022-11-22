const server = require("express")();
const express = require("express");
const apiRouter = require("./api");

server.use(express.json());
server.use("/api", apiRouter);

module.exports = server;
