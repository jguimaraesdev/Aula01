// routes/titleMovement.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const TitleMovementController = require('../controllers/process/TitleMovementController');
const TitleMovementService = require('../services/process/TitleMovementService');

const titleMovementService = new TitleMovementService(db.Title, db.ControleTitle, authenticateToken, sequelize);
const titleMovementController = new TitleMovementController(titleMovementService);

router.post('/title/:titleId/cancelar', authenticateToken.verifyToken.bind(authenticateToken),(req, res) => {
    titleMovementController.cancelarTitulo(req, res).catch(next);
});
router.post('/title/:titleId/pagar', authenticateToken.verifyToken.bind(authenticateToken),(req, res) => {
    titleMovementController.pagarParcela(req, res).catch(next);
});

module.exports = router;
