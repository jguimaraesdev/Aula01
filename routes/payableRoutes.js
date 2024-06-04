// routes/payableRoutes.js

//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const PayableService = require('../services/moduloContasPagar/payableService');
const PayableController = require('../controllers/moduloContasPagar/payableController');

// Instanciando o serviço e o controlador
const payableService = new PayableService(db.Payable);
const payableController = new PayableController(payableService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  payableController.create(req, res);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
  payableController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  payableController.findAllProduct(req, res);
});

router.get('/findallbyid/:id', (req, res, next) => {
  payableController.findProductById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  payableController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
