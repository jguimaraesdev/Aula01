// ./models/supplier.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cnpj:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    contato: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    natureza_operacao: {
      type: Sequelize.ENUM('Consignada', 'Venda', 'Exportaçao', 'Importação'),
      defaultValue: 'Importação',
      allowNull: false
    },
    categoria:{
      type: Sequelize.ENUM('Eletronico', 'Papelaria', 'Acessórios', 'Roupa', 'Diversos'),
      defaultValue: 'Diversos',
      allowNull: false
    }
  }, {
    indexes: [
      {
        fields: ['categoria', 'natureza_operacao']
      }
    ]
  });
  return Supplier;
};
