// ./models/purchase.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalCost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('pendente', 'finalizado', 'cancelado'),
      defaultValue: 'pendente',
      allowNull: false,
    },
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Supplier, { 
      foreignKey: 'supplierId', 
      as: 'Supplier' 
    }),
    Purchase.belongsTo(models.Quotation, { 
      foreignKey: 'quotationId', 
      as: 'Quotation' 
    }),
    Purchase.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' 
    })
  };

  return Purchase;
};
