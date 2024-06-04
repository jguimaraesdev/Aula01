//models/Sales.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Sales = sequelize.define('Sales', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tipoMovimento: {
      type: Sequelize.ENUM('Venda', 'Compra'),
      allowNull: false,
    },
    dataVencimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tipoPagamento: {
      type: Sequelize.ENUM('AVISTA', 'PARCELADO'),
      allowNull: false,
    }

  });

    Sales.associate = (models) =>{
      Sales.belongsTo(models.NotaFiscal,{
          foreignKey: 'notafiscalId',
          as:'NotaFiscal'
      });

    };

  return Sales;
};
