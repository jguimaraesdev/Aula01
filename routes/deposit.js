//./routes/deposit.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const DepositService = require('../services/moduloCompras/depositService');
const DepositController = require('../controllers/moduloCompras/depositController');

// Instanciando o serviço e o controlador
const depositService = new DepositService(db.Deposit);
const depositController = new DepositController(depositService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  depositController.create(req, res);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
  depositController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  depositController.findAll(req, res);
});

router.get('/findabyid/:id', (req, res, next) => {
  depositController.findById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  depositController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//
module.exports = router;
