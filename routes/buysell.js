// ./routes/sales.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const BuySellService = require('../services/moduloContas/buysellService');
const BuySellController = require('../controllers/moduloContas/buysellController');

// Instanciando o serviço e o controlador
const buysellService = new BuySellService(db.BuySell);
const buysellController = new BuySellController(buysellService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  buysellController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  buysellController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  buysellController.findAllSales(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  buysellController.findSalesById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  buysellController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
