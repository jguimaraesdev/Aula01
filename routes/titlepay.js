const express = require('express');
const router = express.Router();
const db = require('../models');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const TitlePayController = require('../controllers/process/TitlePayController');
const TitlePayService = require('../services/process/TitlePayService');

const titlepayService = new TitlePayService(db.Title, db.ControleTitle, db.NotaFiscal, db.sequelize, authenticateToken,);
const titlepayController = new TitlePayController(titlepayService);

router.post('/cancelar/:titleId', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    titlepayController.cancelarTitulo(req, res).catch(next);
});

router.put('/pagarintegral', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    titlepayController.pagarIntegral(req, res).catch(next);
});

router.put('/pagarparcial', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    titlepayController.pagarParcial(req, res).catch(next);
});

module.exports = router;
