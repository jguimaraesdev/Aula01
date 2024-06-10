// ./routes/sales.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const SellService = require('../services/moduloVendas/sellService');
const SellController = require('../controllers/moduloVendas/sellController');

// Instanciando o serviço e o controlador
const sellService = new SellService(db.Sell);
const sellController = new SellController(sellService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  sellController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  sellController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  sellController.findAllSales(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  sellController.findSalesById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  sellController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
