// ./routes/xtelefone.js

const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const XtelefoneService = require('../services/moduloUsuarios/xtelefoneService');
const XtelefoneController = require('../controllers/moduloUsuarios/xtelefoneController');

// Instanciando o serviço e o controlador
const xtelefoneService = new XtelefoneService(db.Xtelefone, authenticateToken);
const xtelefoneController = new XtelefoneController(xtelefoneService);

// Rotas que exigem autenticação
router.post('/newxtelefone', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    xtelefoneController.create(req, res);
});

router.put('/updateXtelefone/:id', (req, res, next) => {
    xtelefoneController.update(req, res);
});

router.get('/findallxtelefones', (req, res, next) => {
    xtelefoneController.findAllXtelefones(req, res);
});

router.get('/findXtelefonebyId/:id', (req, res, next) => {
    xtelefoneController.findXtelefoneById(req, res);
});

router.delete('/deletextelefone/:id', (req, res, next) => {
    xtelefoneController.delete(req, res);
  });

module.exports = router;
