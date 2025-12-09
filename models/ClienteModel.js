import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Cliente = db.define("Cliente", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cep: {type: DataTypes.INTEGER, allowNull: false},
  numero: {type: DataTypes.STRING, allowNull: false},
  endereco: { type: DataTypes.STRING, allowNull: false },
  complemento: {type: DataTypes.STRING, allowNull: true},
  cidade: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  pais: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  tipo: {type: DataTypes.ENUM('Física', 'Jurídica'), allowNull: false},
  status: {type: DataTypes.ENUM('Ativo', 'Desativado', 'Bloqueado'), defaultValue: 'Ativo'}
});

export default Cliente;
