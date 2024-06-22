//models/title.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Title = sequelize.define('Title', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qtd_Parcela: {
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
    status: {
      type: Sequelize.ENUM('pendente', 'pago', 'cancelado'),
      defaultValue: 'pendente',
    },
  }, {
    indexes: [
      {
        fields: ['qtd_Parcela', 'situacao']
      }
    ]
  });

  Title.associate = (models) =>{
    Title.belongsTo(models.NotaFiscal,{
        foreignKey: 'notafiscalId',
        as: 'NotaFiscal',
        allowNull: true
  });
  };

  return Title;
};
