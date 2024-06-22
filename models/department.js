// ./models/department.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Department = sequelize.define('Department', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
    },
  }, {
    indexes: [
      {
        fields: ['nome']
      }
    ]
  });


  return Department;
};
