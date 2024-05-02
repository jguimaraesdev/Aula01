const express = require('express');
const router = express.Router();

const db = require('../models');
const DepositService = require('../services/depositService');
const DepositController = require('../controllers/depositController');

// Instanciando o serviço e o controlador
const depositService = new DepositService(db.Deposit);
const depositController = new DepositController(depositService);

// Rotas
router.post('/newdeposits', (req, res, next) => {
  depositController.create(req, res);
});

router.get('/findalldeposits', (req, res, next) => {
  depositController.findAllDeposits(req, res);
});

module.exports = router;
