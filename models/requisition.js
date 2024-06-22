// ./models/requisition.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Requisition = sequelize.define('Requisition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    produto_requerido: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoria:{
      type: Sequelize.ENUM('Eletronico', 'Papelaria', 'Acessórios', 'Roupa', 'Diversos'),
      defaultValue: 'Diversos',
      allowNull: false
    },
    natureza_operacao: {
      type: Sequelize.ENUM('Devolução', 'Retorno', 'Complementar', 'Remessa', 'Consignada', 'Venda', 'Exportaçao', 'Importação'),
      allowNull: false
    }, 
    qtd_requerida: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
    status: {
      type: Sequelize.ENUM('Em Processamento', 'Concluida', 'Rejeitada'),
      defaultValue: 'Em Processamento',
    },
  });

  Requisition.associate = (models) => {
    Requisition.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'User' ,
      allowNull: false
    }),
    Requisition.belongsTo(models.CostCenter, {
      foreignKey: 'costCenterId', 
      as: 'CostCenter' ,
      allowNull: false
    });
  };

  return Requisition;
};
