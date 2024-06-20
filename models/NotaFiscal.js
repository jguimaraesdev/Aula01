//models/NotaFiscal.js

const Sequelize = require('sequelize');

module.exports= (sequelize) => {
    
    const NotaFiscal = sequelize.define('NotaFiscal',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        natureza_operacao: {
            type: Sequelize.ENUM('Devolução', 'Retorno', 'Complementar', 'Remessa', 'Entrega Futura', 'Venda', 'Consignada', 'Compra'),
            allowNull: false
        },
        cnpj_cpf_comprador:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nome_razao_comprador:{
            type: Sequelize.STRING,
            allowNull:false
        },
        descricao_produto:{
            type: Sequelize.STRING,
            allowNull: false
        },
        quantidade:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        cnpj_cpf_emitente:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nome_razao_emitente:{
            type: Sequelize.STRING,
            allowNull:false
        },
        valor_nota:{
            type:Sequelize.DOUBLE,
            allowNull:false
        },
        
     
    });

    return NotaFiscal;
};