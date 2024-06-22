//./routes/notafiscal.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const NotaFiscalService = require('../services/notafiscalService');
const NotaFiscalController = require('../controllers/notafiscalController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const notafiscalService = new NotaFiscalService(db.NotaFiscal, authenticateToken);
const notafiscalController = new NotaFiscalController(notafiscalService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  notafiscalController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  notafiscalController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  notafiscalController.findAllProduct(req, res).catch(next);
});

router.get('/findall/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  notafiscalController.findProductById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  notafiscalController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
