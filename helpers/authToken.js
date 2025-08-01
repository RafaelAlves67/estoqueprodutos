import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()

const secret = process.env.SECRET 

export async function authToken(req,res,next){
    const tokenHeader = req.headers['authorization']
    const token = tokenHeader && tokenHeader.split(' ')[1]

    if(!token){
        return res.status(403).json({msg: "Acesso negado"})
    }

    jwt.verify(token, secret, (error, result) => {
        if(error){
            return res.status(403).json({msg: "Token inválido!"})
        }

        req.user = user 
        next()
    })
}