import Estoque from "../models/EstoqueModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Produto from "../models/ProdutoModel.js";
import Usuario from "../models/UsuarioModel.js";

export async function movimentacaoEstoque(req,res){
    try {
         const {tipo, observacao, usuario_id, produtos, id_local} = req.body 

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

        // ENTRADA NO ESTOQUE
        if(tipo === 'ENTRADA'){
            const estoque_local_produto = await Estoque.findOne({
                where: {produto_id: produto.id, localarmaz_id: id_local}
                }) 

            if(!estoque_local_produto){
                   
            }

            
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