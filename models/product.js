// ./models/product.js
const Sequelize = require('sequelize');
module.exports= (sequelize) => {
    
    const Product = sequelize.define('Product',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('Ativo', 'Inativo'),
            allowNull: false
        }
        
        
    });
    return Product;
};