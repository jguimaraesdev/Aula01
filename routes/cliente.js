//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ClienteService = require('../services/clienteService');
const ClienteController = require('../controllers/clienteController');

// Instanciando o serviço e o controlador
const clienteService = new ClienteService(db.Cliente);
const clienteController = new ClienteController(clienteService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  clienteController.create(req, res);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
  clienteController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  clienteController.findAll(req, res).catch(next);
});

router.get('/findallbyid/:id', (req, res, next) => {
  clienteController.findById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  clienteController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
