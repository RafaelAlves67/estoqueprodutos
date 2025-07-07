import Produto from "../models/ProdutoModel.js";
import Estoque from "../models/EstoqueModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Usuario from "../models/UsuarioModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";

Produto.belongsTo(Marca, { foreignKey: "marca_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

Estoque.belongsTo(Produto, { foreignKey: "produto_id" });
Movimentacao.belongsTo(Produto, { foreignKey: "produto_id" });

Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });





