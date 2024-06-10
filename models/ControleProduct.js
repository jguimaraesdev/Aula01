// ./models/MovementProduct.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const ControleProduct = sequelize.define('ControleProduct',{

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movimento_tipo: {
            type: Sequelize.ENUM('Entrada', 'Saida', 'Devolução', 'Descarte'),
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
    

    ControleProduct .associate = (models) =>{
        ControleProduct .belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product'
        }),

        ControleProduct .belongsTo(models.Deposit,{
            foreignKey: 'depositId',
            as: 'Deposit'
        });
        
    };


    return ControleProduct ;
};
