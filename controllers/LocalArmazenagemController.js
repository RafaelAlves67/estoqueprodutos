import { Op } from "sequelize";
import LocalArmaz from "../models/LocalArmazenagemModel.js";

export async function criarLocalArmaz(req,res) {
    try {
        const {nome} = req.body 

        if(!nome){
            return res.status(400).json({msg: "Insira nome do local"})
        }

        const novoLocal = await LocalArmaz.create({nome: nome})
        return res.status(200).json(novoLocal)
    } catch (error) {
        console.log("Erro na rota de criar local de armazenagem => ", error)
        return res.status(500).json({msg: "Erro na rota de criar local de armazenagem => ", error})
    }
}

export async function editarLocalArmaz(req,res) {
    try {
        const {nome} = req.body 
        const {id} = req.params

        if(!nome){
            return res.status(400).json({msg: "Insira nome do local"})
        }

        if(!id){
             return res.status(400).json({msg: "Insira id do local"})
        }

        const editLocal = await LocalArmaz.findByPk(id)
        if(!editLocal){
            return res.status(400).json({msg: "Local não encontrado"})
        }

        editLocal.nome = nome;
        editLocal.save()
        
        return res.status(200).json(editLocal)
    } catch (error) {
        console.log("Erro na rota de editar local de armazenagem => ", error)
        return res.status(500).json({msg: "Erro na rota de editar local de armazenagem => ", error})
    }
}

export async function listarLocais(req,res){
    try {
        const locais = await LocalArmaz.findAll()
        if(locais.length === 0){
            return res.status(400).json({msg: "Nenhum local cadastrado"})
        }     
        
        return res.status(200).json(locais)
    } catch (error) {
         console.log("Erro na rota de listar locais de armazenagem => ", error)
        return res.status(500).json({msg: "Erro na rota de listar locais de armazenagem => ", error})
    }

}

export async function deletarLocal(req,res){
    try {
    const {id} = req.params 

    if(!id){
        return res.status(400).json({msg: "Insira id do local"})
    }

      const verificaLocal = await LocalArmaz.findByPk(id)
        if(!verificaLocal){
            return res.status(400).json({msg: "Local não encontrado"})
        }

        await LocalArmaz.destroy({where: {id: id}})   

        return res.status(200).json({msg: "Local excluído"})
    } catch (error) {
          console.log("Erro na rota de deletar local de armazenagem => ", error)
        return res.status(500).json({msg: "Erro na rota de deletar local de armazenagem => ", error})
    }
}

export async function pesquisarLocais(req,res){
    try {
         const {nome} = req.params 

    if(!nome){
        return res.status(400).json({msg: "Insira sua pesquisa!"})
    }

    const resultadosLocais  = await LocalArmaz.find({where: {
        nome: {
            [Op.iLike]: `%${nome}%`
        }
    }})

    if(resultadosLocais.length === 0){
        return res.status(400).json({msg: "Nenhum local encontrado!"})
    }

    return res.status(200).json(resultadosLocais)   
    } catch (error) {
           console.log("Erro na rota de pesquisar local de armazenagem => ", error)
        return res.status(500).json({msg: "Erro na rota de pesquisar local de armazenagem => ", error})
    }
}

