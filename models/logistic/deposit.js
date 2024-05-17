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
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Setting default value to true
            allowNull: false
        }
        
    });


    return Deposit;
};



