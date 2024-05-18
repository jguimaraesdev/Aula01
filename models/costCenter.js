// ./models/costCenter.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const CostCenter = sequelize.define('CostCenter', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return CostCenter;
};
