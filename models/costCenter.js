// ./models/costCenter.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const CostCenter = sequelize.define('CostCenter', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    
  });
  
  CostCenter.associate = (models) => {
    CostCenter.belongsTo(models.Department, {
        constraint:true,
        foreignKey: 'departmentId',
        as: 'Department'
    }),
    CostCenter.hasMany(models.Requisition, {
      foreignKey: 'costCenterId', 
      as: 'Requisition' 
    });
};
  return CostCenter;
};
