import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken"

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

// Expressão regular para validação de email e senha
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex para email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex para senha

server.use(express.json());

// Verificando se a variável DB_LOCATION está definida
if (!process.env.DB_LOCATION) {
  console.error("A variável DB_LOCATION não está definida no .env");
  process.exit(1);
}

// Conectando ao MongoDB
mongoose
  .connect(process.env.DB_LOCATION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000
  })
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err.message);
    process.exit(1); // Encerra o servidor se a conexão falhar
  });

const formatDataSend = (user) => {
  
  const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

// Função para gerar o nome de usuário
const generateUsername = async (email) => {
  let username = email.split("@")[0];

  // Verifica se o nome de usuário já existe
  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  });
  if (isUsernameNotUnique) {
    username += nanoid();
  }
  return username;
};

// Rota de cadastro (signup)
server.post("/signup", async (req, res) => {
  let { fullname, email, password } = req.body;

  // Verifica se fullname e email estão presentes
  if (!fullname || fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 letters long" });
  }

  if (!email || !email.length) {
    return res.status(403).json({ error: "Entre com o E-mail" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email inválido!" });
  }

  // Validação de senha
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter",
    });
  }

  try {
    // Hash da senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Gerar o nome de usuário
    let username = await generateUsername(email);

    // Criação do usuário
    let user = new User({
      personal_info: { fullname, email, password: hashedPassword, username },
    });

    // Salvando o usuário no banco de dados
    await user.save();
    return res.status(200).json(formatDataSend(user));

  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({ error: "Email já existe." });
    }
    return res.status(500).json({ error: "Erro ao salvar o usuário: " + err.message });
  }
});


server.post("/signin", (req, res) =>{
    let { email, password} =  req.body

    User.findOne({"personal_info.email": email})
    .then((user) =>{
      if(!user){
        return res.status(403).json({"error":"email não encontrado"})
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) =>{
          if(err){
            return res.status(403).json({"error": "erro ocorreu enquando logava. tente de novo!"})
          }
          if(!result){
            return res.status(403).json({"error": "Senha incorreta!"})
          }else{
            return res.status(200),json(formatDataSend(user))
          }
      })

    })
    .catch(err =>{
      console.log(err.message)
      return res.status(500).json({"error":err.message})
    })
})

// Inicia o servidor na porta definida
server.listen(PORT, () => {
  console.log("Servidor ouvindo na porta " + PORT);
});
