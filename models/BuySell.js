//models/BuySell.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BuySell = sequelize.define('BuySell', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    valor: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    tipoMovimento: {
      type: Sequelize.ENUM('Venda', 'Compra'),
      allowNull: false,
    },
    dataVencimento: {
      type: Sequelize.DATE,
      allowNull: false
    },
    tipoPagamento: {
      type: Sequelize.ENUM('AVISTA', 'PARCELADO'),
      allowNull: false,
    }

  });

    BuySell.associate = (models) =>{
      BuySell.belongsTo(models.NotaFiscal,{
          foreignKey: 'notafiscalId',
          as:'NotaFiscal'
      });

    };

    BuySell.associate = (models) =>{
      BuySell.belongsTo(models.User,{
          foreignKey: 'userlId',
          as:'User'
      });

    };

  return BuySell;
};
