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
  quotationController.create(req, res).catch(next);
});

router.put('/update/:id', (req, res, next) => {
  quotationController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  quotationController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', (req, res, next) => {
  quotationController.findById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  quotationController.delete(req, res).catch(next);
});

router.get('/findquotationsbysupplier/:supplierId', (req, res, next) => {
  quotationController.getQuotationsBySupplier(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
