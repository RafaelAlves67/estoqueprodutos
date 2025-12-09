import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Produto = db.define("Produto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  unidade_medida: { type: DataTypes.STRING(10), allowNull: false },
  data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Produto;
