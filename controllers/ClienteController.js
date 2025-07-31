import Cliente from "../models/ClienteModel.js"
import { validateCEP } from "../helpers/validarCEP.js"
import { validarCPF } from "../helpers/validarCPF.js"
import { validateCNPJ } from "../helpers/validarCNPJ.js"

    // CADASTRO
export async function cadastrarCliente(req,res){
    try {
        const {nome, endereco, cidade, estado, pais, cnpj, numero, cep, complemento, cpf, tipo} = req.body

        if(!nome || !endereco || !cidade || !estado || !pais  || !numero || !cep || !tipo){
            return res.status(400).json({msg: "Informe os campos necessário para cadastro do cliente"})
        }   

        // MASCARA PARA VALIDAR CEP
        if(!validateCEP(cep)){
            return res.status(400).json({msg: "CEP inválido!"})
        }
        // CNPJ OU CPF
        if(!cnpj && !cpf){
            return res.status(400).json({msg: "Informe tipo Jurídica ou Física"})
        }

        // MASCARA PARA VALIDAR CNPJ
        if(cnpj){
            if(!validateCNPJ(cnpj)){
                return res.status(400).json({msg: "CNPJ inválido!"})
            }
        // VALIDAR CPF
        }else{
            if(!validarCPF(cpf)){
                return res.status(400).json({msg: "CPF inválido!"})
            }
        }

        // VERIFICAR SE CLIENTE JA EXISTE
        const verificarCliente = await Cliente.findOne({
            where: {
                [Op.or]: [
                    {cnpj: cnpj},
                    {cnpj: cpf}
                ]
            }
        })

        if(verificarCliente){
            return res.status(400).json({msg: "Cliente com CNPJ/CPF já cadastrado"})
        }

        // CRIAR CLIENTE 
        const novoCliente = await Cliente.create({
            nome, endereco, cidade, estado, pais, cnpj, numero, cep, complemento, cpf
        })

        return res.status(200).json(novoCliente)
        
        
    } catch (error) {
        console.log("Erro no cadastro do cliente! => ", error)
        return res.status(500).json({msg: "Erro no cadastro do cliente! => ", error})
    }
}

// EDITAR
export async function editarCliente(req,res){
    try {
         const {nome, endereco, cidade, estado, pais, cnpj, numero, cep, complemento, cpf, tipo} = req.body
        const {id} = req.params

        const cliente

        if(!nome || !endereco || !cidade || !estado || !pais  || !numero || !cep || !tipo){
            return res.status(400).json({msg: "Informe os campos necessário para cadastro do cliente"})
        }   

        // MASCARA PARA VALIDAR CEP
        if(!validateCEP(cep)){
            return res.status(400).json({msg: "CEP inválido!"})
        }
        // CNPJ OU CPF
        if(!cnpj && !cpf){
            return res.status(400).json({msg: "Informe tipo Jurídica ou Física"})
        }

        // MASCARA PARA VALIDAR CNPJ
        if(cnpj){
            if(!validateCNPJ(cnpj)){
                return res.status(400).json({msg: "CNPJ inválido!"})
            }
        // VALIDAR CPF
        }else{
            if(!validarCPF(cpf)){
                return res.status(400).json({msg: "CPF inválido!"})
            }
        }


    } catch (error) {
           console.log("Erro para editar cliente! => ", error)
        return res.status(500).json({msg: "Erro para editar cliente! => ", error})
    }
}

// DELETAR
export async function deletarCliente(req,res){
    try {
        
    } catch (error) {
         console.log("Erro para deletar cliente! => ", error)
        return res.status(500).json({msg: "Erro para deletar cliente! => ", error})
    }
}

// LER
export async function listarCliente(req,res){
    try {
        
    } catch (error) {
         console.log("Erro para listar clientes! => ", error)
        return res.status(500).json({msg: "Erro para listar clientes! => ", error})
    }
}

// PESQUISA
export async function pesquisaCliente(req,res){
    try {
        
    } catch (error) {
         console.log("Erro para pesquisar clientes! => ", error)
        return res.status(500).json({msg: "Erro para pesquisar clientes! => ", error})
    }
}