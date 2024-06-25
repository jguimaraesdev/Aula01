//models/BuySellDetails.js

const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    
    const SellDetails = sequelize.define('SellDetails',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        quantidade:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        preco_venda:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
     
    });

    SellDetails.associate = (models) =>{
        SellDetails.belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        });
        
        SellDetails.belongsTo(models.Sell, {
            foreignKey: 'sellId',
            as: 'Sell'
        });
        SellDetails.belongsTo(models.Cliente, {
            foreignKey: 'clienteId',
            as: 'Cliente'
        });
        SellDetails.belongsTo(models.NotaFiscal, {
            foreignKey: 'notafiscalId',
            as: 'NotaFiscal',
            allowNull:true
        });
    };

    return SellDetails;
};