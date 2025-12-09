import express from 'express'
import { criarUsuario, login } from '../controllers/UsuarioController.js'

const userRoute = express.Router()

userRoute.post('/create', criarUsuario)
userRoute.post('/sign', login)

export default userRoute