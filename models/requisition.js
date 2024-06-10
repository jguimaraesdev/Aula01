// ./models/requisition.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Requisition = sequelize.define('Requisition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    produto_requerido: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
   
    qtd_requerida: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
    status: {
      type: Sequelize.ENUM('pendente', 'comprado', 'cancelado'),
      defaultValue: 'pendente',
    },
  });

  Requisition.associate = (models) => {
    Requisition.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' 
    }),
    Requisition.belongsTo(models.CostCenter, {
      foreignKey: 'costCenterId', 
      as: 'CostCenter' 
    }),
    Requisition.hasMany(models.Quitation, { 
      foreignKey: 'requisitionId', 
      as: 'Quotation' 
    });
  };

  return Requisition;
};
