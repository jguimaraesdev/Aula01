// ./routes/purchase.js

const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const PurchaseProcessingService = require('../services/process/PurchaseProcessingService');
const PurchaseProcessingController = require('../controllers/process/PurchaseProcessingController');

// Instanciando o serviço e o controlador
const purchaseProcessingService = new PurchaseProcessingService(
    db.Purchase, 
    db.Requisition, 
    db.Product, 
    db.ControleProduct, 
    db.Title, 
    db.ControleTitle, 
    db.Quotation, 
    db.Supplier, 
    db.NotaFiscal, 
    db.sequelize
);
const purchaseProcessingController = new PurchaseProcessingController(purchaseProcessingService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    purchaseProcessingController.create(req, res).catch(next);
});

module.exports = router;
