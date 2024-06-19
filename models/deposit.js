// ./models/deposit.js

const Sequelize = require('sequelize');
module.exports = (sequelize) => {

    const Deposit = sequelize.define('Deposit',{
        
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        central: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true, // Setting default value to true
            allowNull: false
        }
        
    });


    return Deposit;
};



