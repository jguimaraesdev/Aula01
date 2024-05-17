// ./models/quotation.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Quotation = sequelize.define('Quotation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    supplierId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Suppliers',
        key: 'id',
      },
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    quotationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    buyerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    validityDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  Quotation.associate = (models) => {
    Quotation.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    Quotation.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
    Quotation.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' });
  };

  return Quotation;
};
