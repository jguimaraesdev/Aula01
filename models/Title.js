//models/title.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Title = sequelize.define('Title', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroNotaFiscal: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numeroParcela: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    valorOriginal: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    dataVencimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    situacao: {
      type: Sequelize.ENUM('pendente', 'pago', 'cancelado'),
      defaultValue: 'pendente',
    },
  });

  return Title;
};
