const Sequelize = require('sequelize');
const Product = require('./product');

module.exports = (sequelize) => {
    const Deposit = sequelize.define('Deposit', {
        movimento: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        qtd: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Deposit.belongsTo(Product); // Relacionamento: Um depósito pertence a um produto

    return Deposit;
};
