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
      unique:true
    },
    
  }, {
    indexes: [
      {
        fields: ['codigo']
      }
    ]
  });
  
  CostCenter.associate = (models) => {
    CostCenter.belongsTo(models.Department, {
        constraint:true,
        foreignKey: 'departmentId',
        as: 'Department',
        allowNull: false
    });
};
  return CostCenter;
};
