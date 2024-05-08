// ./models/moviments.js
const Sequelize = require('sequelize');
module.exports = (sequelize) =>{

    const Moviments =  sequelize.define('Moviment',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        movimento_tipo:{
            type: Sequelize.STRING,
            allowNull:false
        },
        qtd_disponivel:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        qtd_bloqueado:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        valor_unitario:{
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        }
        
    });

    Moviment.associate = (models) =>{
        Moviment.belongsTo(models.Product, { // Corrigido o relacionamento
            foreignKey: 'productId', // Corrigido o nome da chave estrangeira
            as: 'product' // Corrigido o alias
        });
    };

    Moviment.associate = (models) =>{
        Moviment.belongsTo(models.Deposit, { // Corrigido o relacionamento
            foreignKey: 'depositId', // Corrigido o nome da chave estrangeira
            as: 'deposit' // Corrigido o alias
        });
    };
}