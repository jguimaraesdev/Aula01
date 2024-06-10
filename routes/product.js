//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ProductService = require('../services/aprovisionamento/productService');
const ProductController = require('../controllers/aprovisionamento/productController');

// Instanciando o serviço e o controlador
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  productController.create(req, res);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
  productController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  productController.findAll(req, res);
});

router.get('/findallbyid/:id', (req, res, next) => {
  productController.findById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  productController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
