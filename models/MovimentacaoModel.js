import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Movimentacao = db.define("Movimentacao", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.ENUM('ENTRADA', 'SAIDA', 'TRANSFERENCIA'), allowNull: false },
  data_movimentacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  origem_destino: { type: DataTypes.STRING },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  observacao: { type: DataTypes.TEXT, allowNull: true}
});

export default Movimentacao;
