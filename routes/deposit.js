//./routes/deposit.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const DepositService = require('../services/depositService');
const DepositController = require('../controllers/depositController');

// Instanciando o serviço e o controlador
const depositService = new DepositService(db.Deposit);
const depositController = new DepositController(depositService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newdeposit', (req, res, next) => {
  depositController.create(req, res);
});

// Rota de atualização
router.put('/updateDeposit/:id', (req, res, next) => {
  depositController.update(req, res);
});

router.get('/findalldeposit', (req, res, next) => {
  depositController.findAllDeposits(req, res);
});

router.get('/findalldepositbyid/:id', (req, res, next) => {
  depositController.findDepositById(req, res);
});

router.delete('/deletedeposit/:id', (req, res, next) => {
  depositController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//
module.exports = router;
