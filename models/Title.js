//models/title.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Title = sequelize.define('Title', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroParcela: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    valorParcela: {
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

  Title.associate = (models) =>{
    Title.belongsTo(models.NotaFiscal,{
        foreignKey: 'notafiscalId',
        as: 'NotaFiscal'
    });
};

  return Title;
};
