//models/Sales.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Sales = sequelize.define('Sales', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    qtdVendida: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    custoUnitario: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    parcelas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numeroNotaFiscal: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  });

    Sales.associate = (models) =>{
      Sales.belongsTo(models.Product,{
          foreignKey: 'productId',
          as: 'Product'
      });
    };


  return Sales;
};
