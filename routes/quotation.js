// ./routes/quotation.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const QuotationService = require('../services/moduloCompras/quotationService');
const QuotationController = require('../controllers/moduloCompras/quotationController');

// Instanciando o serviço e o controlador
const quotationService = new QuotationService(db.Quotation);
const quotationController = new QuotationController(quotationService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  quotationController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  quotationController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  quotationController.findAllQuotations(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  quotationController.findQuotationById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  quotationController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
