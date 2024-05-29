//./routes/notafiscal.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const NotaFiscalService = require('../services/moduloVendas/notafiscalService');
const NotaFiscalController = require('../controllers/moduloVendas/notafiscalController');

// Instanciando o serviço e o controlador
const notafiscalService = new NotaFiscalService(db.NotaFiscal);
const notafiscalController = new NotaFiscalController(notafiscalService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newnotafiscal', (req, res, next) => {
  notafiscalController.create(req, res);
});

// Rota de atualização
router.put('/updatenotafiscal/:id', (req, res, next) => {
  notafiscalController.update(req, res);
});

router.get('/findallnotafiscal', (req, res, next) => {
  notafiscalController.findAllProduct(req, res);
});

router.get('/findallnotafiscalbyid/:id', (req, res, next) => {
  notafiscalController.findProductById(req, res);
});

router.delete('/deletenotafiscal/:id', (req, res, next) => {
  notafiscalController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
