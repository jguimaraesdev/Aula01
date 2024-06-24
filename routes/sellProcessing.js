const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const SellProcessingService = require('../services/process/SellProcessingService');
const SellProcessingController = require('../controllers/process/SellProcessingController');

// Instanciando o serviço e o controlador
const sellProcessingService = new SellProcessingService(
  db.Sell,
  db.Requisition,
  db.Product,
  db.ControleProduct,
  db.Title,
  db.ControleTitle,
  db.SellDetails,
  db.NotaFiscal,
  db.Cliente,
  db.sequelize
);
const sellProcessingController = new SellProcessingController(sellProcessingService);

// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  sellProcessingController.create(req, res).catch(next);
});

module.exports = router;
