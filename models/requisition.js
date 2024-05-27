// ./models/requisition.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Requisition = sequelize.define('Requisition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    qtd_requerida: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
    status: {
      type: Sequelize.ENUM('pendente', 'processada', 'cancelada'),
      defaultValue: 'pendente',
    },
  });

  Requisition.associate = (models) => {
    Requisition.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' 
    }),
    Requisition.belongsTo(models.Product, {
      foreignKey: 'productId', 
      as: 'Product' 
    }),
    Requisition.belongsTo(models.CostCenter, {
      foreignKey: 'costCenterId', 
      as: 'CostCenter' 
    });
  };

  return Requisition;
};
