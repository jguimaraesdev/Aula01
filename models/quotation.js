// ./models/quotation.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Quotation = sequelize.define('Quotation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    
    cotacaoData: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    
    validadeCotacao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  Quotation.associate = (models) =>{
    Quotation.belongsTo(models.Supplier, { 
      foreignKey: 'supplierId', 
      as: 'Supplier',
      allowNull: false 
    }),
    Quotation.belongsTo(models.Requisition, { 
      foreignKey: 'requisitionId', 
      as: 'Requisition',
      allowNull: false 
    });

  };

  return Quotation;
};
