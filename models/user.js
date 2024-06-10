// ./models/user.js
const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    const User = sequelize.define('User',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false
        },
        login:{
            type: Sequelize.STRING,
            allowNull:true
        },
        email:{
            type: Sequelize.STRING,
            unique:true
        },
        senha:{
            type:Sequelize.STRING,
            allowNull:false
        },

        status: {
            type: Sequelize.ENUM('ativo', 'desligado'),
            allowNull: false
        },

    });

    User.associate = (models) =>{
        User.hasMany(models.Xtelefone,{
            foreignKey: 'userId',
            as: 'Xtelefone'
    }),
        User.hasMany(models.Requisition, { 
          foreignKey: 'userId', 
          as: 'Requisition' 
    });

    return User;
};