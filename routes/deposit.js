//./routes/deposit.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const DepositService = require('../services/moduloCompras/depositService');
const DepositController = require('../controllers/moduloCompras/depositController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const depositService = new DepositService(db.Deposit, authenticateToken);
const depositController = new DepositController(depositService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  depositController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  depositController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  depositController.findAll(req, res).catch(next);
});

router.get('/findabyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  depositController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  depositController.delete(req, res).catch(next);
});


//--------------------------------------------------------------------------------------------------//
module.exports = router;
