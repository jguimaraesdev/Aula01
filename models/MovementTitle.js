const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const MovementTitle = sequelize.define('MovementTitle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    dataMovimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dataMovimento: {
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
  });

  MovementTitle.associate = (models) =>{
    MovementTitle.belongsTo(models.Title,{
        foreignKey: 'titleId',
        as: 'Title'
    });
  };

  return MovementTitle;
};
