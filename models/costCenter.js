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
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return CostCenter;
};
