//Conexão com MongoDB
const mongoose = require("mongoose");
require("dotenv").config(); // Para carregar variáveis do .env

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 Conectado ao MongoDB");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
