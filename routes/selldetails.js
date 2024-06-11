// ./routes/buyselldetails.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const SellDetailsService = require('../services/moduloVendas/selldetailsService');
const SellDetailsController = require('../controllers/moduloVendas/selldetailsController');

// Instanciando o serviço e o controlador
const selldetailsService = new SellDetailsService(db.Sell);
const selldetailsController = new SellDetailsController(selldetailsService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  selldetailsController.create(req, res).catch(next);
});

router.put('/update/:id', (req, res, next) => {
  selldetailsController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  selldetailsController.findAllSales(req, res).catch(next);
});

router.get('/findbyid/:id', (req, res, next) => {
  selldetailsController.findSalesById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  selldetailsController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
