import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Marca = db.define("Marca", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  pais_origem: { type: DataTypes.STRING(50) }
});

export default Marca;
