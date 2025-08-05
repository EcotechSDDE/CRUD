// models/index.js
const Usuario = require('./usuarioModel');
const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');
const Tempo = require('./tempoModel');

// Definindo associações
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Produto.belongsTo(Tempo, { foreignKey: 'tempoId' });

module.exports = {
  Usuario,
  Categoria,
  Produto,
  Tempo
};
