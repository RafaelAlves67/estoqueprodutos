import { DataTypes } from "sequelize";
import db from "../data/db.js";

const LocalArmaz = db.define("LocalArmaz", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: {type: DataTypes.STRING, allowNull: false},
});

export default LocalArmaz;
