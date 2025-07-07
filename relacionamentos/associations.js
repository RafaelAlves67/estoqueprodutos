import Produto from "../models/ProdutoModel.js";
import Estoque from "../models/EstoqueModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Usuario from "../models/UsuarioModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Marca from "../models/MarcaModel.js"
import Categoria from "../models/CategoriaModel.js"

Produto.belongsTo(Marca, { foreignKey: "marca_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

Estoque.belongsTo(Produto, { foreignKey: "produto_id" });
Movimentacao.belongsTo(Produto, { foreignKey: "produto_id" });

Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

LocalArmaz.hasMany(Estoque, { foreignKey: 'localarmaz_id' });
Estoque.belongsTo(LocalArmaz, { foreignKey: 'localarmaz_id' });







