import Produto from "../models/ProdutoModel.js";
import Estoque from "../models/EstoqueModel.js";
import Movimentacao from "../models/MovimentacaoModel.js";
import Usuario from "../models/UsuarioModel.js";
import LocalArmaz from "../models/LocalArmazenagemModel.js";
import Marca from "../models/MarcaModel.js"
import Categoria from "../models/CategoriaModel.js"
import itemMovimentacao from "../models/itemMovimentacaoModel.js";
import Cliente from "../models/ClienteModel.js";

Produto.belongsTo(Marca, { foreignKey: "marca_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

Estoque.belongsTo(Produto, { foreignKey: "produto_id" });
Movimentacao.belongsTo(Produto, { foreignKey: "produto_id" });

Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

LocalArmaz.hasMany(Estoque, { foreignKey: 'localarmaz_id' });
Estoque.belongsTo(LocalArmaz, { foreignKey: 'localarmaz_id' });

Produto.hasMany(itemMovimentacao, {foreignKey: 'produto_id'}) 
itemMovimentacao.belongsTo(Produto, {foreignKey: 'produto_id'})

itemMovimentacao.hasMany(Movimentacao, {foreignKey: 'movimentacao_id'}) 
Movimentacao.belongsTo(itemMovimentacao, {foreignKey: 'movimentacao_id'})

LocalArmaz.hasMany(Movimentacao, { foreignKey: 'localarmaz_id' });
Movimentacao.belongsTo(LocalArmaz, { foreignKey: 'localarmaz_id' });

Cliente.hasMany(Movimentacao, { foreignKey: 'cliente_id' });
Movimentacao.belongsTo(Cliente, { foreignKey: 'cliente_id' });







