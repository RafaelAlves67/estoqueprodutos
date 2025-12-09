import Usuario from "../models/UsuarioModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv";
configDotenv()

const secret = process.env.SECRET

// CRIAR USUÁRIO
export async function criarUsuario(req,res){
    try {
       const {nome, email, senha, confirmaSenha} = req.body

    if(!nome || !email || !senha || !confirmaSenha){
        res.status(400).json({msg: "Preencha os campos vazio!"})
    }

    const confirmaEmail = await Usuario.findOne({where: {email: email}})
    if(confirmaEmail){
        return res.status(403).json({msg: "E-mail cadastrado!"})
    }

    if(senha !== confirmaSenha){
        return res.status(403).json({msg: "Senhas não coincidem!"})
    }

    const salt = 12 
    const hashPassword = await bcrypt.hash(senha, salt)

    const novoUsuario = await Usuario.create({
        nome: nome,
        senha: hashPassword,
        email: email
    })

    return res.status(200).json(novoUsuario)   
    } catch (error) {
         console.log("Erro na rota de cadastro de usuário = >" , error)
        res.status(500).json({msg: "Erro na rota de cadastro de usuário = > ", error})
    }
}

// LOGIN 
export async function login(req, res) {
    try {
      const {email, senha} = req.body 
      console.log(senha)

        if(!email || !senha){
            return res.status(400).json({msg: "Preencha email e/ou senha!"})
        }   

        const verificaEmail = await Usuario.findOne({where: {email: email}})
        if(!verificaEmail){
            return res.status(400).json({msg: "E-mail não existe"})
        }
        
        const verificarSenha = await bcrypt.compare(senha, verificaEmail.senha)
        if(!verificarSenha){
            return res.status(403).json({msg: "Senha incorreta!"})
        }

        const token = await jwt.sign(verificaEmail.id , secret)
        return res.status(200).json({msg: "Usuário logado", token})
    } catch (error) {
        console.log("Erro na rota de login = >" , error)
        res.status(500).json({msg: "Erro na rota de login = > ", error})
    }
}