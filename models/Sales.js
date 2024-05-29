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
    tipoVenda: {
      type: Sequelize.ENUM('AVISTA', 'PARCELADO'),
      allowNull: false,
    }

  });

    Title.associate = (models) =>{
      Title.belongsTo(models.NotaFiscal,{
          foreignKey: 'notafiscalId',
          as: 'NotaFiscal'
      });

    };

  return Sales;
};
