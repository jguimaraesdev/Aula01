// ./models/deposit.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Deposit = sequelize.define('Deposit',{
        
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        central: {
            type: DataTypes.STRING,
            unique:true
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            defaultValue: true, // Setting default value to true
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



