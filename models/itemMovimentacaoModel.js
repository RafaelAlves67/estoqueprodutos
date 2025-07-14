import { DataTypes } from "sequelize";
import db from "../data/db.js";

const itemMovimentacao = db.define("itemMovimentacao", {
  id_produto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false }
});

export default Movimentacao;
