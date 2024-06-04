// ./routes/sales.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const PayableSalesService = require('../services/moduloContas/payablesalesService');
const PayableSalesController = require('../controllers/moduloContas/payablesalesController');

// Instanciando o serviço e o controlador
const payablesalesService = new PayableSalesService(db.Sales);
const payablesalesController = new PayableSalesController(payablesalesService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  payablesalesController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  payablesalesController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  payablesalesController.findAllSales(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  payablesalesController.findSalesById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  payablesalesController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
