// ./models/purchase.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataCompra: {
      type: Sequelize.DATE,
      allowNull: false
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
      type: Sequelize.ENUM('1X', '2X', '3X'),
      allowNull: false,
    }
  }, {
    indexes: [
        {
            fields: ['tipoPagamento']
        }
        // Adicione outros índices conforme necessário
    ]
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