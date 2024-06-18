// ./models/xtelefone.js
const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    const Xtelefone = sequelize.define('Xtelefone',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        DDD:{
            type: Sequelize.STRING,
            allowNull:false
        },
        numero:{
            type: Sequelize.STRING,
            unique:true
        },
        
    });

    Xtelefone.associate = (models) =>{
        Xtelefone.belongsTo(models.User,{
            foreignKey: 'userId',
            as: 'User',
            allowNull: false
        });
    };

    return Xtelefone;
};