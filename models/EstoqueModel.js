import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Estoque = db.define("Estoque", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  localArmazenagem: {type: DataTypes.STRING, allowNull: false},
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  data_atualizacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Estoque;
