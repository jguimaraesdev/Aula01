// ./models/moviments.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {

    const Moviments = sequelize.define('Moviment',{

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movimento_tipo: {
            type: Sequelize.ENUM('entrada', 'saida'),
            allowNull: false
        },
        qtd_disponivel: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        qtd_bloqueado: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valor_faturado: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });

    // criando relacionamento
    

    Moviments.associate = (models) =>{
        Moviments.belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        }),

        Moviments.belongsTo(models.Deposit,{
            foreignKey: 'depositId',
            as: 'Deposit'
        });
        
    };


    return Moviments;
};
