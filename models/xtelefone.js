// ./models/xtelefone.js
const Sequelize = require('sequelize');
module.exports= (sequelize) => {
    
    const xtelefone = sequelize.define('xtelefone',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true
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

    xtelefone.associate = (models) =>{
        xtelefone.belongsTo(sequelize.models.User,{
            foreingKey: 'userId',
            as: 'User'
        });
    };

    return xtelefone;
};