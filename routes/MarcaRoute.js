import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { criarMarca, editarMarca, excluirMarca, listarMarcas } from '../controllers/MarcaController.js'

const marcaRoute = express.Router()

marcaRoute.post('/cadastrar', authToken, criarMarca)
marcaRoute.patch('/editar', authToken, editarMarca)
marcaRoute.delete('delete/:id', authToken, excluirMarca)
marcaRoute.get('/listar', authToken, listarMarcas)

export default marcaRoute