// ./routes/quotation.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const QuotationService = require('../services/moduloCompras/quotationService');
const QuotationController = require('../controllers/moduloCompras/quotationController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const quotationService = new QuotationService(db.Quotation, authenticateToken);
const quotationController = new QuotationController(quotationService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  quotationController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  quotationController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  quotationController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  quotationController.findById(req, res).catch(next);
});

router.delete('/delete/:id',authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  quotationController.delete(req, res).catch(next);
});

router.get('/findquotationsbysupplier/:supplierId',authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  quotationController.getquotationsbysupplier(req, res).catch(next);
});

router.get('/findquotationsbyrequisition/:rquisitionId', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  quotationController.getquotationbyrequisition(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
