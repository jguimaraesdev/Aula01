var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var depositRouter = require('./routes/deposit');
var xtelefoneRouter = require('./routes/xtelefone');
var movimentsRouter = require('./routes/moviments');
const supplierRoutes = require('./routes/supplier');
const costCenterRoutes = require('./routes/costCenter');
const requisitionRoutes = require('./routes/requisition');
const quotationRoutes = require('./routes/quotation');
const purchaseRoutes = require('./routes/purchase');
const departamentRoutes = require('./routes/department');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/deposit', depositRouter);
app.use('/xtelefone', xtelefoneRouter);
app.use('/moviments', movimentsRouter);
app.use('/supplier', supplierRoutes);
app.use('/cost', costCenterRoutes);
app.use('/requisition', requisitionRoutes);
app.use('/quotation', quotationRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/departament', departamentRoutes);




const db = require('./models');

async function ApplyMigrations(){
    try{
        migration_config={
            create:true,
            alter:true
        };

        await db.sequelize.sync({
            alter: migration_config.alter
        });
        console.log('Sincronização com o banco de dados realizada.')
    }
    catch(error){
        console.log('Erro sincronizando o banco de dados', error);
    }
}

ApplyMigrations();

const port = 3001; // Use uma porta diferente
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;