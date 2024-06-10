// ./models/supplier.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contato: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Supplier.associate = (models) =>{
    Supplier.hasMany(models.Product,{
        foreignKey: 'supplierId',
        as: 'Product'
    }),
    Supplier.hasMany(models.Quotation, { 
      foreignKey: 'supplierId', 
      as: 'Quotation' 
    })
  };
 
  
  return Supplier;
};
