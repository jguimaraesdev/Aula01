const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const ControleTitle = sequelize.define('ControleTitle', {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoMovimento: {
      type: Sequelize.ENUM('abertura', 'pagamento'),
      allowNull: false,
    },
    valorMovimento: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    valorMulta: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    valorJuros: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },

  }, {
    indexes: [
      {
        fields: ['tipoMovimento']
      }
    ]
  });

  ControleTitle.associate = (models) =>{
    ControleTitle.belongsTo(models.Title,{
        foreignKey: 'titleId',
        as: 'Title',
        allowNull: false
    });
  };

  return ControleTitle;
  
};
