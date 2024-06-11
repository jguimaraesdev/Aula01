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
  sellController.create(req, res).catch(next);
});

router.put('/update/:id', (req, res, next) => {
  sellController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  sellController.findAllSales(req, res).catch(next);
});

router.get('/findbyid/:id', (req, res, next) => {
  sellController.findSalesById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  sellController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
