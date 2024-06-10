//models/BuySellDetails.js

const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    
    const BuySellDetails = sequelize.define('NotaFiscal',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        quantidade:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        preco:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
     
    });

    BuySellDetails.associate = (models) =>{
        BuySellDetails.belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        });
        
    };

    BuySellDetails.associate = (models) => {
        BuySellDetails.belongsTo(models.BuySell, {
            foreignKey: 'buysellId',
            as: 'BuySell'
        });
    };

    return BuySellDetails;
};