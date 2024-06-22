
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
    }, {
      indexes: [
        {
          fields: ['CPF']
        }
      ]
    });
    
    Cliente.associate = (models) =>{
      Cliente.belongsTo(models.User,{
          foreignKey: 'userId',
          as: 'User',
          allowNull: false
      });
  };

    
    return Cliente;
};
