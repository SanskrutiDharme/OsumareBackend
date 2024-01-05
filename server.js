const express = require("express");
require('dotenv').config();
const http = require("http");
const curdOperation = require("./crudOperations/crudOperation");

const PORT = process.env.API_PORT;

const app = express();
app.use(express.json());
app.use("/", curdOperation);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server started")
})