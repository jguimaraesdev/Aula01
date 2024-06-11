// ./routes/movimentproduct.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ControleProductService = require('../services/aprovisionamento/controleproductService');
const ControleProductController = require('../controllers/aprovisionamento/controleproductController');

// Instanciando o serviço e o controlador
const controleproductService = new ControleProductService(db.ControleProduct);
const controleproductController = new ControleProductController(controleproductService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  controleproductController.create(req, res).catch(next);
});

router.put('/update/:id', (req, res, next) => {
  controleproductController.update(req, res).catch(next);
});

router.get('/findallt', (req, res, next) => {
  controleproductController.findAllMovements(req, res).catch(next);
});

router.get('/findbyid/:id', (req, res, next) => {
  controleproductController.findMovementById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  controleproductController.delete(req, res).catch(next);
});

// Nova rota para buscar posição por depósito
router.get('/getPosicaoByDeposito/:depositoId', (req, res, next) => {
  controleproductController.getPosicaoByDeposito(req, res).catch(next);
});

// Nova rota para buscar posição por produto e depósito
router.get('/getPosicaoByProdutoDeposito/:produtoId/:depositoId', (req, res, next) => {
  controleproductController.getPosicaoByProdutoDeposito(req, res).catch(next);
});




//--------------------------------------------------------------------------------------------------//

module.exports = router;
