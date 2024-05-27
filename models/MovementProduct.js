// ./models/MovementProduct.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {

    const MovementProduct = sequelize.define('MovementProduct',{

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
    

    MovementProduct .associate = (models) =>{
        MovementProduct .belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        }),

        MovementProduct .belongsTo(models.Deposit,{
            foreignKey: 'depositId',
            as: 'Deposit'
        });
        
    };


    return MovementsProduct ;
};
