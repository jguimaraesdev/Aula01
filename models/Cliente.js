
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cliente = sequelize.define('Cliente', {
  
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CPF: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });

    Cliente.associate = (models) =>{
      Cliente.hasMany(models.Sell,{
          foreignKey: 'clienteId',
          as:'Sell'
      });
    };
    return Cliente;
};
