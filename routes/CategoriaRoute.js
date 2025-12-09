import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { criarCategoria, editarCategoria, excluirCategoria, listarCategorias } from '../controllers/CategoriaController.js'

const categoriaRoute = express.Router()

categoriaRoute.get('/listar', authToken, listarCategorias)
categoriaRoute.post('/cadastrar', authToken, criarCategoria)
categoriaRoute.delete('/delete', authToken, excluirCategoria)
categoriaRoute.patch('/editar', authToken, editarCategoria)

export default categoriaRoute