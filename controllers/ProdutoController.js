import Produto from "../models/ProdutoModel.js";
import { Op } from "sequelize";


export async function cadastrarProduto(req,res){
    try {
         const {nome, descricao, preco, unidade_medida} = req.body 

        if(!nome || !preco || !unidade_medida){
            return res.status(400).json({msg: "Preencha os campos necessários para cadastrar produto!"})
        } 
        
        const novoProduto = await Produto.create({
            nome, descricao, preco, unidade_medida
        })

        return res.status(200).json({msg: "Produto cadastrado", novoProduto})
    } catch (error) {
        console.log("Erro na rota de cadastrar produto => ", error)
        return res.status(501).json({msg: "Erro na rota de cadastrar produto => ", error})
    }
}

export async function excluirProduto(req,res){
    try {
        const {id} = req.params 

        const produto = await Produto.findByPk(id)
        if(!produto)
        {
            return res.status(400).json({msg: "Produto não encontrado!"})
        } 
        
        await Produto.destroy({where: {id: id}})
        return res.status(200).json({msg: "Produto excluído!"})
    } catch (error) {
          console.log("Erro na rota de editar produto => ", error)
        return res.status(501).json({msg: "Erro na rota de editar produto => ", error})
    }
}

export async function listarProdutos(req,res) {
    try {
        const produtos = await Produto.findAll()
    if(produtos.length === 0){
           return res.status(400).json({msg: "Nenhum produto cadastrado!"})
    }  
    
    return res.status(200).json(produtos)
    } catch (error) {
         console.log("Erro na rota de listar produtos => ", error)
        return res.status(501).json({msg: "Erro na rota de listar produtos => ", error})
    }
}

export async function editarProduto(req,res) {
    try {
      const {nome, descricao, preco, unidade_medida, ativo} = req.body 
      const {id} = req.params
      
      const produtoEdicao = await Produto.findByPk(id) 
           if(!produtoEdicao)
        {
            return res.status(400).json({msg: "Produto não encontrado!"})
        } 

        produtoEdicao.nome = nome 
        produtoEdicao.descricao = descricao 
        produtoEdicao.preco = preco 
        produtoEdicao.unidade_medida = unidade_medida 
        produtoEdicao.ativo = ativo 
        produtoEdicao.save()

        return res.status(200).json({msg: "Produto editado => ", produtoEdicao})

    } catch (error) {
         console.log("Erro na rota de editar produtos => ", error)
        return res.status(501).json({msg: "Erro na rota de editar produtos => ", error})
    } 
}

export async function pesquisaProduto(req,res){
    try {
        const {nome} = req.params  

        if(!nome){
            return res.status(400).json({msg: "Insira o valor para pesquisa do produto"})
        }

        const produtosPesquisados = await Produto.findAll({
            where: {nome: {
                [Op.like]: `%${nome}%`
            }}
        })

        if(produtosPesquisados.length === 0){
            return res.status(400).json({msg: "Nenhum produto encontrado!"})
        }

        return res.status(200).json(produtosPesquisados)
    } catch (error) {
         console.log("Erro na rota de pesquisar produtos => ", error)
        return res.status(501).json({msg: "Erro na rota de pesquisar produtos => ", error})
    }
    
}