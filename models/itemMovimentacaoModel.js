import { DataTypes } from "sequelize";
import db from "../data/db.js";

const itemMovimentacao = db.define("itemMovimentacao", {
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
});

export default itemMovimentacao;
