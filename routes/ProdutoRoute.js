import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { cadastrarProduto, editarProduto, excluirProduto, listarProdutos, pesquisaProduto } from '../controllers/ProdutoController.js'

const produtoRoute = express.Router()

produtoRoute.get('/listar', authToken, listarProdutos)
produtoRoute.post('/cadastrar',  authToken,  cadastrarProduto)
produtoRoute.get('/pesquisar',  authToken, pesquisaProduto)
produtoRoute.patch('/editar/:id',  authToken, editarProduto)
produtoRoute.delete('/excluir/:id',  authToken, excluirProduto)

export default produtoRoute

