import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const server = express();
let PORTA = 3000;

mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
  })
  .then(() => console.log("Banco de Dados conectado"))
  .catch(() => console.log("deu errado!"));

server.listen(PORTA, () => {
});
