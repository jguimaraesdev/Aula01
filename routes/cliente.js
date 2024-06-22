//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ClienteService = require('../services/clienteService');
const ClienteController = require('../controllers/clienteController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const clienteService = new ClienteService(db.Cliente, authenticateToken);
const clienteController = new ClienteController(clienteService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  clienteController.create(req, res);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  clienteController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  clienteController.findAll(req, res).catch(next);
});

router.get('/findallbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  clienteController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  clienteController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
