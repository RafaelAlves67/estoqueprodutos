import Estoque from "../models/EstoqueModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Produto from "../models/ProdutoModel.js";
import Usuario from "../models/UsuarioModel.js";

export async function movimentacaoEstoqueEntrada(req,res){
    try {
         const {tipo, observacao, usuario_id, produtos, id_local} = req.body 
         const produtosReturn = [];

    if(!tipo || !usuario_id || !produtos || !id_local){
        return res.status(400).json({msg: "Informe os campos para movimentação"})
    }

        const localArmazenagem = await LocalArmaz.findByPk(id_local)
        if(!localArmazenagem){
            return res.status(400).json({msg: "Local de armazenagem não encontrado"})
        }

        const verificaUsuario = await Usuario.findByPk(usuario_id)
        if(!verificaUsuario){
            return res.status(400).json({msg: "Usuário não encontrado"})
        }

        if(!produtos){
            return res.status(400).json({msg: "Informe um produto para movimentação!"})
        }


    for(let produto of produtos){
        try {
        // validações
         const verificaProduto = await Produto.findByPk(produto.id) 
        if(!verificaProduto){
            return res.status(400).json({msg: "Produto não encontrado"})
        }

        if(produto.quantidade === 0){
            return res.status(400).json({msg: "Informe uma quantidade para o produto!"})
        }

   
            const estoque_local_produto = await Estoque.findOne({
                where: {produto_id: produto.id, localarmaz_id: id_local}
                }) 

            if(estoque_local_produto.lenght === 0){
                const novoEstoque = await Estoque.create({
                    quantidade: produto.quantidade,
                    produto_id: produto.id,
                    localarmaz_id: id_local
                })

                produtosReturn.push(novoEstoque)
            }

            estoque_local_produto.quantidade = estoque_local_produto.quantidade + produto.quantidade 
            estoque_local_produto.data_atualizacao = new Date() 

            produtosReturn.push(estoque_local_produto)
            const novaMovimentacao = await Movimentacao.create({
                tipo: 'ENTRADA',
                quantidade: quantidade,
            })
            return res.status(200).json({msg: "Movimentação de entrada feita com sucesso!", produtosReturn})
   
        } catch (error) {
            console.log("Erro no looping de produtos => ", error)
        return res.status(501).json({msg: "Erro no looping de produtos => ", error})
        }      
        
    }   
    } catch (error) {
        console.log("Erro na rota de entrada de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de entrada de movimentação de estoque => ", error})
    }
}

export async function movimentacaoEstoqueSaida(req,res) {
    try {
            const {tipo, observacao, usuario_id, produto_id, id_local, quantidade} = req.body 
          if(!tipo || !usuario_id || !produto_id || !id_local || !quantidade){
        return res.status(400).json({msg: "Informe os campos para movimentação"})
        }

        if(quantidade === 0){
            return res.status(400).json({msg: "Quantidade zerada"})
        }

        const localArmazenagem = await LocalArmaz.findByPk(id_local)
        if(!localArmazenagem){
            return res.status(400).json({msg: "Local de armazenagem não encontrado"})
        }

        const verificaUsuario = await Usuario.findByPk(usuario_id)
        if(!verificaUsuario){
            return res.status(400).json({msg: "Usuário não encontrado"})
        }

        const estoque = await Estoque.find({where: {
            localarmaz_id: id_local,
            produto_id: produto_id
        }})

        if(!estoque){
            return res.status(400).json({msg: "Estoque não existe!"})
        }

        if(estoque.quantidade === 0){
            return res.status(400).json({msg: "Estoque está zerado!"})
        }

        if(quantidade > estoque.quantidade){
            return res.status(400).json({msg: "Saldo insuficiente para saída!"})
        }

        estoque.quantidade = estoque.quantidade - quantidade
    } catch (error) {
        console.log("Erro na rota de saída de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de saída de movimentação de estoque => ", error})
    }
}