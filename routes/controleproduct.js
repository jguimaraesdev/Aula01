// ./routes/movimentproduct.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ControleProductService = require('../services/aprovisionamento/controleproductService');
const ControleProductController = require('../controllers/aprovisionamento/controleproductController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const controleproductService = new ControleProductService(db.ControleProduct, authenticateToken);
const controleproductController = new ControleProductController(controleproductService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.delete(req, res).catch(next);
});

// Nova rota para buscar posição por depósito
router.get('/getPosicaoByDeposito/:depositId', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.getPosicaoByDeposito(req, res).catch(next);
});

// Nova rota para buscar posição por produto e depósito
router.get('/getPosicaoByProdutoDeposito/:produtoId/:depositoId', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controleproductController.getPosicaoByProdutoDeposito(req, res).catch(next);
});




//--------------------------------------------------------------------------------------------------//

module.exports = router;
