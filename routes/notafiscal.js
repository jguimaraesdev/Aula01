//./routes/notafiscal.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const NotaFiscalService = require('../services/notafiscalService');
const NotaFiscalController = require('../controllers/notafiscalController');

// Instanciando o serviço e o controlador
const notafiscalService = new NotaFiscalService(db.NotaFiscal);
const notafiscalController = new NotaFiscalController(notafiscalService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  notafiscalController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
  notafiscalController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  notafiscalController.findAllProduct(req, res).catch(next);
});

router.get('/findall/:id', (req, res, next) => {
  notafiscalController.findProductById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  notafiscalController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
