//models/BuySell.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Sell = sequelize.define('Sell', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dataVenda: {
      type: Sequelize.DATE,
      allowNull: false
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
    ]
  });

    Sell.associate = (models) =>{
      Sell.belongsTo(models.Requisition,{
          foreignKey: 'requisitionId',
          as:'Requisition'
      }),
      Sell.belongsTo(models.User, { 
        foreignKey: 'userId', 
        as: 'User' ,
        allowNull: false
      })
    };

  return Sell;
};
