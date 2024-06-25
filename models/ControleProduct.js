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
            type: Sequelize.ENUM('Disponivel', 'Devolução', 'Descarte'),
            allowNull: false,
            defaultValue: 'Disponivel'
        },
        qtd_disponivel: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        preco_custo:{
            type: Sequelize.DOUBLE,
            allowNull:false
        },
        qtd_bloqueado_venda: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        indexes: [
          {
            fields: ['movimento_tipo']
          }
        ]
      });

    // criando relacionamento
    

    ControleProduct .associate = (models) =>{
        ControleProduct .belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'Product',
            allowNull: false
        }),

        ControleProduct .belongsTo(models.Deposit,{
            foreignKey: 'depositId',
            as: 'Deposit',
            allowNull: false
        });
       
    };


    return ControleProduct ;
};
