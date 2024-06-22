// ./routes/sales.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const SellService = require('../services/moduloVendas/sellService');
const SellController = require('../controllers/moduloVendas/sellController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const sellService = new SellService(db.Sell, authenticateToken);
const sellController = new SellController(sellService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  sellController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  sellController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  sellController.findAllSales(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  sellController.findSalesById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  sellController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
