const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const depositRouter = require('./routes/deposit');
const xtelefoneRouter = require('./routes/xtelefone');
const movimentsRouter = require('./routes/moviments');
const supplierRouter = require('./routes/supplier');
const costCenterRouter = require('./routes/costCenter');
const requisitionRouter = require('./routes/requisition');
const quotationRouter = require('./routes/quotation');
const purchaseRouter = require('./routes/purchase');
const departmentRouter = require('./routes/department');

const { applyMigrations } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

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
app.use('/supplier', supplierRouter);
app.use('/cost', costCenterRouter);
app.use('/requisition', requisitionRouter);
app.use('/quotation', quotationRouter);
app.use('/purchase', purchaseRouter);
app.use('/departament', departmentRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

// Sincronização com o banco de dados
applyMigrations();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
