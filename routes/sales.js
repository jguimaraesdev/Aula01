// ./routes/sales.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const SalesService = require('../services/moduloVendas/salesService');
const SalesController = require('../controllers/moduloVendas/salesController');

// Instanciando o serviço e o controlador
const salesService = new SalesService(db.Sales);
const salesController = new SalesController(salesService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  salesController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  salesController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  salesController.findAllSales(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  salesController.findSalesById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  salesController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
