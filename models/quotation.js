// ./models/quotation.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Quotation = sequelize.define('Quotation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    
    quotationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    
    validityDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  Quotation.associate = (models) => {
    Quotation.belongsTo(models.Product, { 
      foreignKey: 'productId', 
      as: 'Product' 
    }),
    Quotation.belongsTo(models.Supplier, { 
      foreignKey: 'supplierId', 
      as: 'Supplier' 
    }),
    Quotation.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' 
    });

  };

  return Quotation;
};
