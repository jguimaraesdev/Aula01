//app.js

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
const movementproductRouter = require('./routes/movementproduct');
const supplierRouter = require('./routes/supplier');
const costCenterRouter = require('./routes/costCenter');
const requisitionRouter = require('./routes/requisition');
const quotationRouter = require('./routes/quotation');
const departmentRouter = require('./routes/department');
const controletitleRouter = require('./routes/controletitle');
const titleRouter = require('./routes/title');
const purchaseRouter = require('./routes/purchase');
const notafiscalRouter = require('./routes/notafiscal');
const payablesalesRouter = require('./routes/payablesales');

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
app.use('/movementproduct', movementproductRouter);
app.use('/supplier', supplierRouter);
app.use('/cost', costCenterRouter);
app.use('/requisition', requisitionRouter);
app.use('/quotation', quotationRouter);
app.use('/department', departmentRouter);
app.use('/controletitle', controletitleRouter);
app.use('/title', titleRouter);
app.use('/purchase', purchaseRouter);
app.use('/notafiscal', notafiscalRouter);
app.use('/payablesales', payablesalesRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

// Sincronização com o banco de dados
applyMigrations();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
