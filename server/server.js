import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import { nanoid } from "nanoid";

const server = express();
const PORT = process.env.PORT || 3000; // Permitir configuração via variável de ambiente

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex mais simples e eficiente para validar e-mail
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Senha deve ter pelo menos 8 caracteres, incluindo número, letra minúscula e maiúscula

server.use(express.json()); // Middleware para JSON

// Verifique se a variável de ambiente DB_LOCATION está definida
console.log("🔗 String de conexão do MongoDB:", process.env.DB_LOCATION);

// Conectar ao banco de dados de forma assíncrona
mongoose
  .connect(process.env.DB_LOCATION, { autoIndex: true })
  .then(() => console.log("✅ Banco de Dados conectado"))
  .catch((error) => console.error("❌ Erro ao conectar ao banco de dados:", error));

const gerarUser = async (email) => {
    let username = gerarUser

    let usernameUnique = await User.exists({"personal_info.username": username}).then((result)=> result)

    usernameUnique ? username += nanoid() : ""

    return username
}

server.post("/signup", async (req, res) => {
  try {
    // Log dos dados recebidos no servidor
    console.log("📥 Dados recebidos:", req.body);

    const { nomeCompleto, email, password } = req.body;

    // Validações
    if (!nomeCompleto || nomeCompleto.trim().length < 3) {
      return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
    }

    if (!email || !emailRegex.test(email.toLowerCase())) {
      return res.status(400).json({ error: "E-mail inválido!" });
    }

    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: "A senha deve ter pelo menos 8 caracteres, incluindo número, letra minúscula e maiúscula.",
      });
    }

    // Verificar se o e-mail já está cadastrado
    const existingUser = await User.findOne({ "personal_info.email": email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "E-mail já cadastrado!" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split("@")[0];

    // Criar usuário
    const newUser = new User({
      personal_info: { name: nomeCompleto.trim(), email: email.toLowerCase(), password: hashedPassword, username },
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: savedUser });

  } catch (error) {
    if(error.code ===  11000){
        return res.status(500).json({"error": "Email já existe!"})
    }
    console.error("❌ Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor. Tente novamente mais tarde." });
  }
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
