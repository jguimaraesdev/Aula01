// ./routes/movimentproduct.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const MovementProductService = require('../services/movementproductService');
const MovementProductController = require('../controllers/movementproductController');

// Instanciando o serviço e o controlador
const movementproductService = new MovementProductService(db.MovementProduct);
const movementproductController = new MovementProductController(movementproductService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  movementproductController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  movementproductController.update(req, res);
});

router.get('/findallt', (req, res, next) => {
  movementproductController.findAllMovements(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  movementproductController.findMovementById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  movementproductController.delete(req, res);
});

// Nova rota para buscar posição por depósito
router.get('/getPosicaoByDeposito/:depositoId', (req, res, next) => {
  movementproductController.getPosicaoByDeposito(req, res);
});

// Nova rota para buscar posição por produto e depósito
router.get('/getPosicaoByProdutoDeposito/:produtoId/:depositoId', (req, res, next) => {
  movementproductController.getPosicaoByProdutoDeposito(req, res);
});




//--------------------------------------------------------------------------------------------------//

module.exports = router;
