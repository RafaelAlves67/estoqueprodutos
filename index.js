import cors from 'cors'
import express from 'express' 
import db from './data/db.js'

// models
import Produto from './models/ProdutoModel.js'
import Estoque from './models/EstoqueModel.js'
import Marca from './models/MarcaModel.js'
import Movimentacao from './models/MovimentacaoModel.js'
import Usuario from './models/UsuarioModel.js'
import Categoria from './models/CategoriaModel.js'

// rotas
import userRoute from './routes/usuarioRoute.js'
import produtoRoute from './routes/ProdutoRoute.js'
import categoriaRoute from './routes/CategoriaRoute.js'


const app = express()

app.use(cors())
app.use(express.json())

// rotas
app.use('/user', userRoute)
app.use('/produto', produtoRoute)
app.use('/categoria', categoriaRoute)


async function connectBanco(){
    try {
        await db.sync({alter: true});
        console.log("Banco sicronizado...")

        app.listen(3000, () => {
        console.log("Rodando servidor na porta 3000...")   
        })
    }catch(error) {
        console.log("Erro no servidor => ", error)
    }
}

connectBanco();

