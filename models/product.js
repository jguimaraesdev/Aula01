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
            allowNull:false,
            unique:true
        },
        preco_custo:{
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('Ativo', 'Inativo'),
            allowNull: false,
            defaultValue:'Ativo'
        }
        
        
    }, {
        indexes: [
            {
                fields: ['nome', 'status']
            }
            // Adicione outros índices conforme necessário
        ]
    });

    Product.associate = (models) =>{
        Product.belongsTo(models.Supplier,{
            foreignKey: 'supplierId',
            as: 'Supplier',
            allowNull: false
        
    });
        
    };


    return Product;
};