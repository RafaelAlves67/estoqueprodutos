import Marca from "../models/MarcaModel.js";

export async function criarMarca(req,res){
    try {
        const {nome, pais_origem} = req.body 

        if(!nome || !pais_origem){
            return res.status(400).json({msg: "Informe os campos para cadastrar marca"})
        }

        const novaMarca = await Marca.create({
            nome, pais_origem
        })

        return res.status(200).json({msg: "Marca cadastrada!", novaMarca})
    } catch (error) {
         console.log("Erro na rota de criar marca => ", error)
        return res.status(501).json({msg: "Erro na rota de criar marca => ", error})
    }
}

export async function editarMarca(req,res){
    try {
        const {nome, pais_origem} = req.body 
        const {id} = req.params 

        if(!nome || !pais_origem || !id){
            return res.status(400).json({msg: "Informe os campos para editar a marca!"})
        }

        const verificaMarca = await Marca.findByPk(id)
        if(!verificaMarca){
            return res.status(400).json({msg: "Marca não encontrada"})
        }
        verificaMarca.nome = nome 
        verificaMarca.pais_origem = pais_origem 
        verificaMarca.save() 

        return res.status(200).json({msg: "Marca editada", verificaMarca})


    } catch (error) {
        console.log("Erro na rota de editar marca => ", error)
        return res.status(501).json({msg: "Erro na rota de editar marca => ", error})
    }
}

export async function excluirMarca(req,res){
        try {
            const {id} = req.params 
           const verificaMarca = await Marca.findByPk(id)
            if(!verificaMarca){
                return res.status(400).json({msg: "Marca não encontrada"})
            }
            
            await Marca.destroy({where: {id: id}})
            return res.status(200).json({msg: "Produto excluído"})
        } catch (error) {
            console.log("Erro na rota de excluir marca => ", error)
            return res.status(501).json({msg: "Erro na rota de excluir marca => ", error})
        }
}

export async function listarMarcas(req,res){
    try {
        const marcas = await Marca.findAll()
        if(marcas.length > 0){
            return res.status(400).json({msg: "Nenhuma marca encontrada"})
        }

        return res.status(200).json(marcas)
    } catch (error) {
          console.log("Erro na rota de listar marcas => ", error)
            return res.status(501).json({msg: "Erro na rota de listar marcas => ", error})
    }
}
