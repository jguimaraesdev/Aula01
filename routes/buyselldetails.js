// ./routes/buyselldetails.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const BuySellDetailsService = require('../services/moduloContas/buyselldetailsService');
const BuySellDetailsController = require('../controllers/moduloContas/buyselldetailsController');

// Instanciando o serviço e o controlador
const buyselldetailsService = new BuySellDetailsService(db.BuySell);
const buyselldetailsController = new BuySellDetailsController(buyselldetailsService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  buyselldetailsController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  buyselldetailsController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  buyselldetailsController.findAllSales(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  buyselldetailsController.findSalesById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  buyselldetailsController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
