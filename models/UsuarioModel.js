import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Usuario = db.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('ADMIN', 'FUNCIONARIO'), defaultValue: 'FUNCIONARIO' },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Usuario;
