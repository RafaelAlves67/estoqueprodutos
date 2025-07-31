import Estoque from "../models/EstoqueModel.js";
import itemMovimentacao from "../models/itemMovimentacaoModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Produto from "../models/ProdutoModel.js";
import Usuario from "../models/UsuarioModel.js";

export async function movimentacaoEstoqueEntrada(req,res){
    try {
         const {tipo, observacao, usuario_id, produtos, id_local, cliente_id} = req.body 
         const produtosReturn = [];

    if(!tipo || !usuario_id || !produtos || !id_local || !cliente_id){
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

        const vericaCliente = await Cliente.findByPk(cliente_id) 
        if(!vericaCliente){
            return res.status(400).json({msg: "Cliente não encontrado"})
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

            if(!estoque_local_produto){
                const novoEstoque = await Estoque.create({
                    quantidade: produto.quantidade,
                    produto_id: produto.id,
                    localarmaz_id: id_local
                })
            }

            estoque_local_produto.quantidade = estoque_local_produto.quantidade + produto.quantidade 
            estoque_local_produto.data_atualizacao = new Date() 

            produtosReturn.push(produto)   
        } catch (error) {
            console.log("Erro no looping de produtos => ", error)
            return res.status(501).json({msg: "Erro no looping de produtos => ", error})
        }      
        
    }   
        // FIM DO FOR
         const novaMovimentacao = await Movimentacao.create({
                tipo: 'ENTRADA',
                usuario_id: usuario_id,
                observacao: observacao,
                localarmaz_id:  id_local,
                cliente_id: cliente_id
            })

        // CADASTRAR ITENS MOVIMENTACAO
        const itemMovEstq = await produtos.map(produto => ({
            ...produto,
            movimentacao_id: novaMovimentacao.id
        }))

        // CRIAR REGISTRO NO BANCO DO ITEM
        const novoItemMovEstq = await itemMovimentacao.bulkCreate(itemMovEstq, {
            validate: true
        })
        
        return res.status(200).json({msg: "Movimentação de entrada feita com sucesso!", novaMovimentacao, novoItemMovEstq})
    } catch (error) {
        console.log("Erro na rota de entrada de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de entrada de movimentação de estoque => ", error})
    }
}

export async function movimentacaoEstoqueSaida(req,res) {
    try {
        const {tipo, observacao, usuario_id, produtos, id_local, cliente_id} = req.body
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

          const vericaCliente = await Cliente.findByPk(cliente_id) 
        if(!vericaCliente){
            return res.status(400).json({msg: "Cliente não encontrado"})
        }

        for(let produto of produtos){
            const estoque = await Estoque.find({where: {
                localarmaz_id: id_local,
                produto_id: produto.id
            }})

             if(!estoque){
                return res.status(400).json({msg: "Estoque não existe!"})
              }

                 if(estoque.quantidade === 0){
            return res.status(400).json({msg: "Estoque está zerado!"})
        }

        if(produto.quantidade > estoque.quantidade){
            return res.status(400).json({msg: "Saldo insuficiente para saída!"})
        }

        estoque.quantidade = estoque.quantidade - produto.quantidade
        estoque.save() 
        }

        // MOVIMENTAÇÃO
        const novaMovimentacao = await Movimentacao.create({
            tipo: 'SAIDA',
            usuario_id: usuario_id,
            observacao: observacao,
            localarmaz_id:  id_local,
            cliente_id: cliente_id
        })

        const itensMovEstq = await produtos.map(p => ({
            ...p,
            movimentacao_id: novaMovimentacao.id
        }))

        // ITEM MOVIMENTAÇÃO 
        const novosItemMovimentacao = await itemMovimentacao.bulkCreate(itensMovEstq, {
            validate: true
        })
     
        return res.status(200).json({msg: "Movimentação de saída feita!", novaMovimentacao, novosItemMovimentacao})

    } catch (error) {
        console.log("Erro na rota de saída de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de saída de movimentação de estoque => ", error})
    }
}


export async function ajusteInventario(req,res){
    try {
     const {produto_id, local_origem, local_destino, usuario_id, observacao, quantidade} = req.body

    if(!produto_id || !local_destino || !local_origem || !usuario_id || !quantidade){
        return res.status(400).json({msg: "Preencha os campos para transfêrencia"})
    }

    const verificaProduto = await Produto.findByPk(produto_id)   
    if(!verificaProduto){
        return res.status(400).json({msg: "Produto não encontrado!"})
    }

    const verificaLocalOrigem = await LocalArmaz.findByPk(local_origem)   
    if(!verificaLocalOrigem){
        return res.status(400).json({msg: "Local de origem não encontrado!"})
    }

    const verificaLocalDestino = await LocalArmaz.findByPk(local_destino)   
    if(!verificaLocalDestino){
        return res.status(400).json({msg: "Local de destino não encontrado!"})
    }

    const verificaUsuario = await Usuario.findByPk(usuario_id)   
    if(!verificaUsuario){
        return res.status(400).json({msg: "Usuário não encontrado!"})
    }

    if(quantidade === 0 || !quantidade || quantidade < 0){
         return res.status(400).json({msg: "Quantidade inválida!"})
    }

    // verifica estoque do local
    const estoqueOrigem = await Estoque.findOne({
        where: {
            localarmaz_id: local_origem,
            produto_id: produto_id
        }
    })

    if(!estoqueOrigem){
        return res.status(400).json({msg: "Estoque de origem não existe!"})
    }

    if(estoqueOrigem.quantidade === 0){
        return res.status(400).json({msg: "Quantidade do estoque está zerada!"})
    }

    if(estoqueOrigem.quantidade < quantidade){
        return res.status(400).json({msg: "Saldo insuficiente para transferência."})
    }

    const estoqueDestino = await Estoque.findOne({
        where: {
            localarmaz_id: local_destino, 
            produto_id: produto_id
        }
    })

    if(!estoqueDestino){
        const novoEstoque = await Estoque.create({
            quantidade: quantidade,
            produto_id: produto_id, 
            localarmaz_id: local_destino
        })
    }else{
        estoqueDestino.quantidade = estoqueDestino.quantidade + quantidade
        estoqueDestino.save()
    }

    
    estoqueOrigem.quantidade = estoqueOrigem.quantidade - quantidade
    estoqueOrigem.save()

    // MOVIMENTAÇÃO
    const novaMovimentacao = await Movimentacao.create({
        tipo: 'TRANSFERENCIA',
        usuario_id: usuario_id,
        observacao: observacao, 
        localarmaz_id: local_destino,
        origem_destino: local_origem
    })

    const itemMovEstq = await itemMovimentacao.create({
        produto_id: produto_id,
        quantidade: quantidade,
        movimentacao_id: novaMovimentacao.id
    })
    return res.status(200).json({msg: "Transferência feita com sucesso!",novaMovimentacao, itemMovEstq , estoqueOrigem, estoqueDestino})

    } catch (error) {
           console.log("Erro na rota de transferencia de movimentação de estoque => ", error)
        return res.status(501).json({msg: "Erro na rota de transferencia  de movimentação de estoque => ", error})
    }
}

