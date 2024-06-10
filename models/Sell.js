//models/BuySell.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Sell = sequelize.define('Sell', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    tipoMovimento: {
      type: Sequelize.ENUM('Venda', 'Compra'),
      allowNull: false,
    },
    dataVenda: {
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
      }),
      
      BuySell.belongsTo(models.Cliente,{
          foreignKey: 'clienteId',
          as:'Cliente'
      });

    };

  return Sell;
};
