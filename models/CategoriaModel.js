import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Categoria = db.define("Categoria", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false }
});

export default Categoria;
