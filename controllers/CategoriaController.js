import Categoria from "../models/CategoriaModel.js";

export async function criarCategoria(req,res){

    try {
        const {nome} = req.body 

        if(!nome){
            return res.status(400).json({msg: "Informe o nome da categoria!"})
        }

        const Categ = await Categoria.create({
            nome
        })
    } catch (error) {
        console.log("Erro na rota de cadastrar categorias => ", error)
        return res.status(501).json({msg: "Erro na rota de cadastrar categorias => ", error})
    }
}

export async function listarCategorias(req,res){
    try {
        const categorias = await Categoria.findAll()

        if(categorias.length === 0){
            return res.status(400).json({msg: "Nenhum categoria cadastrada"})
        }
    } catch (error) {
        console.log("Erro na rota de listar categorias => ", error)
        return res.status(501).json({msg: "Erro na rota de listar categorias => ", error})
    }
}

export async function editarCategoria(req,res){
    try {
        const {nome} = req.body 
        const {id} = req.params

        if(!nome){
            return res.status(400).json({msg: "Informe o nome da categoria"})
        }

        if(!id){
        return res.status(400).json({msg: "Informe o id da categoria"})
        }

        const verificaCategoria = await Categoria.findByPk(id)
        if(!verificaCategoria){
        return res.status(400).json({msg: "Id categoria inválido"})
        }

        verificaCategoria.nome = nome;

        return res.status(200).json({msg: "Categoria alterada", verificaCategoria})
    } catch (error) {
        console.log("Erro na rota de listar categorias => ", error)
        return res.status(501).json({msg: "Erro na rota de listar categorias => ", error})       
    }
}

export async function excluirCategoria(req,res){
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({msg: "Informe o id da categoria"})
        }

          const verificaCategoria = await Categoria.findByPk(id)
        if(!verificaCategoria){
        return res.status(400).json({msg: "Id categoria inválido"})
        }

        await Categoria.destroy({where: {id: id}});

        return res.status(200).json({msg: "Categoria excluida"})

    } catch (error) {
         console.log("Erro na rota de excluir categorias => ", error)
        return res.status(501).json({msg: "Erro na rota de excluir categorias => ", error})
    }
}