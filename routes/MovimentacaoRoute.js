import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { ajusteInventario, movimentacaoEstoqueEntrada, movimentacaoEstoqueSaida } from '../controllers/MovimentacaoController.js'

const movRoute = express.Router()


movRoute.put('/entrada', authToken, movimentacaoEstoqueEntrada)
movRoute.put('/saida', authToken, movimentacaoEstoqueSaida)
movRoute.put('/ajuste', authToken, ajusteInventario)

export default movRoute

