const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria'); // Importa para criar relação

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

// Relação N:1
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });

module.exports = Produto;
