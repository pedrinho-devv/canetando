import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const server = express();
const PORT = process.env.PORT || 3000; // Permitir configuração via variável de ambiente


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


// Middleware para ler o corpo da requisição (necessário para o POST)
server.use(express.json());

server.post("/signin", (req, res) => {
  res.json(req.body); // Ou qualquer lógica que você precise para o signin
});

// Conectar ao banco de dados de forma assíncrona
mongoose
  .connect(process.env.DB_LOCATION, { autoIndex: true })
  .then(() => console.log("Banco de Dados conectado"))
  .catch((error) => console.error("Erro ao conectar com o banco de dados:", error)); // Melhorando o log de erro

// Definir rota POST
server.post("/signup", (req, res) => {
  const { NomeCompleto, Email, password } = req.body;

  if (!NomeCompleto || NomeCompleto.length < 3) {
    return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." }); // Melhorando a mensagem de erro
  }

  if (!Email) {
    return res.status(400).json({ error: "E-mail é obrigatório." }); // Ajustando a validação e a mensagem
  }
  if(emailRegex.test(email)){
    return res.status(403).json({"error":"E-mail Inválido!"})
  }
  if(password.test(password)){
    return res.status(403).json({"error": "Senha deverá ter 8 caracteres "})
  }

  return res.status(200).json({ status: "ok" });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
