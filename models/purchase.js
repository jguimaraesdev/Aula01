// ./models/purchase.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    custototal: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    tipoPagamento: {
      type: Sequelize.ENUM('AVISTA', 'PARCELADO'),
      allowNull: false,
    }
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Quotation, { 
      foreignKey: 'quotationId', 
      as: 'Quotation',
      allowNull: false 
    }),
    Purchase.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' ,
      allowNull: false
    })
  };

  return Purchase;
};