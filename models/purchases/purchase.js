// ./models/purchase.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplierId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Suppliers',
        key: 'id',
      },
    },
    quotationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Quotations',
        key: 'id',
      },
    },
    buyerId: {
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
    unitCost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
    Purchase.belongsTo(models.Quotation, { foreignKey: 'quotationId', as: 'quotation' });
    Purchase.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' });
    Purchase.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Purchase;
};
