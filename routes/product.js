//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ProductService = require('../services/aprovisionamento/productService');
const ProductController = require('../controllers/aprovisionamento/productController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const productService = new ProductService(db.Product, authenticateToken);
const productController = new ProductController(productService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  productController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  productController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  productController.findAll(req, res).catch(next);
});

router.get('/findallbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  productController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  productController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
