import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { cadastrarCliente, deletarCliente, editarCliente, listarCliente, pesquisaCliente } from '../controllers/ClienteController.js'

const clienteRoute = express.Router()

clienteRoute.get('/listar', authToken, listarCliente)
clienteRoute.post('/cadastrar', authToken, cadastrarCliente)
clienteRoute.delete('/delete/:id', authToken, deletarCliente)
clienteRoute.put('/editar/:id', authToken, editarCliente)
clienteRoute.get('/pesquisar', authToken, pesquisaCliente)

export default clienteRoute

