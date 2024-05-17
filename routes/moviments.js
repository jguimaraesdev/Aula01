// ./routes/moviment.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const MovimentsService = require('../services/servicesLogistic/movimentsService');
const MovimentsController = require('../controllers/controllersLogistic/movimentsController');

// Instanciando o serviço e o controlador
const movimentsService = new MovimentsService(db.Moviment);
const movimentsController = new MovimentsController(movimentsService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newmoviment', (req, res, next) => {
  movimentsController.create(req, res);
});

router.put('/updateMoviment/:id', (req, res, next) => {
  movimentsController.update(req, res);
});

router.get('/findallmoviments', (req, res, next) => {
  movimentsController.findAllMoviments(req, res);
});

router.get('/findMovimentById/:id', (req, res, next) => {
  movimentsController.findMovimentById(req, res);
});

// Nova rota para buscar posição por depósito
router.get('/getPosicaoByDeposito/:depositoId', (req, res, next) => {
  movimentsController.getPosicaoByDeposito(req, res);
});

// Nova rota para buscar posição por produto e depósito
router.get('/getPosicaoByProdutoDeposito/:produtoId/:depositoId', (req, res, next) => {
  movimentsController.getPosicaoByProdutoDeposito(req, res);
});
//--------------------------------------------------------------------------------------------------//

module.exports = router;
