import express from 'express'
import {authToken} from '../helpers/authToken.js'
import { criarLocalArmaz, deletarLocal, editarLocalArmaz, listarLocais, pesquisarLocais } from '../controllers/LocalArmazenagemController.js'


const LocalRoute = express.Router()


LocalRoute.get('/listar', authToken, listarLocais)
LocalRoute.put('/editar/:id', authToken, editarLocalArmaz)
LocalRoute.post('/criar',authToken, criarLocalArmaz)
LocalRoute.delete('/delete/:id', authToken, deletarLocal)
LocalRoute.get('/pesquisa/:nome', authToken, pesquisarLocais)

export default LocalRoute