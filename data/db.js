import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()

const db_name = process.env.DB_NAME
const db_host = process.env.DB_HOST
const db_password = process.env.DB_PASSWORD
const db_user = process.env.DB_USER

const db = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    dialect: 'postgres'
})

// conexão assincrona com banco
async function connectDB(){
    try{
        await db.authenticate();
        console.log("Banco de dados conectado!")
    }catch(error){
        console.log("Erro ao conectar com banco de dados => " , error)
    }
}

// chamando função
connectDB();

// exportando
export default db