// ./routes/purchase.js

const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const PurchaseService = require('../services/moduloCompras/purchaseService');
const PurchaseController = require('../controllers/moduloCompras/purchaseController');

// Instanciando o serviço e o controlador
const purchaseService = new PurchaseService(db.Purchase, authenticateToken);
const purchaseController = new PurchaseController(purchaseService);


//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  purchaseController.create(req, res).catch(next);
});

router.put('/update/:id',authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  purchaseController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  purchaseController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  purchaseController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  purchaseController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
