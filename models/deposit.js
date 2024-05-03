// ./models/deposit.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Deposit = sequelize.define('Deposit',{
        
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        movimento: {
            type: DataTypes.ENUM('+', '-'), // Corrigido o tipo de dados ENUM
            allowNull: false
        },
        qtd: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Deposit.associate = (models) =>{
        Deposit.belongsTo(models.Product, { // Corrigido o relacionamento
            foreignKey: 'productId', // Corrigido o nome da chave estrangeira
            as: 'product' // Corrigido o alias
        });
    };

    return Deposit;
};



