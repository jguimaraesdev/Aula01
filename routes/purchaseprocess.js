// ./routes/purchase.js

const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const PurchaseProcessService = require('../services/process/PurchaseProcessingService');
const PurchaseProcessController = require('../controllers/process/PurchaseProcessingController');

// Instanciando o serviço e o controlador
const purchaseprocessService = new PurchaseProcessService(db.Purchase, db.Requisition, db.Quotation, db.Product, db.ControleProduct, db.Title, db.NotaFiscal, db.Supplier, db.ControleTitle, authenticateToken);
const purchaseprocessController = new PurchaseProcessController(purchaseprocessService);


//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  purchaseprocessController.create(req, res).catch(next);
});