import Estoque from "../models/EstoqueModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Produto from "../models/ProdutoModel.js";
import Usuario from "../models/UsuarioModel.js";

export async function movimentacaoEstoque(req,res){
    try {
         const {tipo, observacao, usuario_id, produtos, id_estoque} = req.body 

    if(!tipo || !usuario_id || !produtos || !id_estoque){
        return res.status(400).json({msg: "Informe os campos para movimentação"})
    }

        const estoqueMov = await Estoque.findByPk(id_estoque)
        if(!estoqueMov){
            return res.status(400).json({msg: "Local de armazenagem não encontrado"})
        }

        const verificaUsuario = await Usuario.findByPk(usuario_id)
        if(!verificaUsuario){
            return res.status(400).json({msg: "Usuário não encontrado"})
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

        // ENTRADA NO ESTOQUE
        if(tipo === 'ENTRADA'){
            const estoque_x_produto = await Estoque.findOne({
                where: {produto_id: produto.id, id: id_estoque}
                }) 

            if(!estoque_x_produto){
                const adicionarProdutoEstoque = await Estoque.create({produto_id: produto.id}, {
                    where: {id: id_estoque}
                })
                estoqueMov.save();
            }
                
                estoque_x_produto.quantidade = estoque_x_produto.quantidade + quantidade;
                await estoqueMov.save()
        }
   
        } catch (error) {
            console.log("Erro no looping de produtos => ", error)
        return res.status(501).json({msg: "Erro no looping de produtos => ", error})
        }      
        
    }   
    } catch (error) {
        console.log("Erro na rota de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de movimentação de estoque => ", error})
    }
}