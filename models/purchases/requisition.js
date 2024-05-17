// ./models/requisition.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Requisition = sequelize.define('Requisition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    costCenterId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'CostCenters',
        key: 'id',
      },
    },
    status: {
      type: Sequelize.ENUM('pending', 'fulfilled', 'cancelled'),
      defaultValue: 'pending',
    },
  });

  Requisition.associate = (models) => {
    Requisition.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Requisition.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    Requisition.belongsTo(models.CostCenter, { foreignKey: 'costCenterId', as: 'costCenter' });
  };

  return Requisition;
};
