// models/Payable.js
module.exports = (sequelize, DataTypes) => {
    const Payable = sequelize.define('Payable', {
        valor: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        dataVencimento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pendente', 'Pago'),
            defaultValue: 'Pendente'
        }
    });

    Payable.associate = (models) => {
        Payable.belongsTo(models.Supplier, {
            foreignKey: 'supplierId',
            as: 'supplier'
        });
    };

    Payable.associate = (models) =>{
        Payable.belongsTo(models.NotaFiscal,{
            foreignKey: 'notafiscalId',
            as: 'NotaFiscal'
        });
    };

    return Payable;
};
