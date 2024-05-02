const express = require('express');
const router = express.Router();

const db = require('../models');
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Instanciando o serviço e o controlador
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

// Rotas
router.post('/newproducts', (req, res, next) => {
  productController.create(req, res);
});

router.get('/findAllProduct', (req, res, next) => {
  productController.findAllProduct(req, res);
});

router.get('/findProductById/:id', (req, res, next) => {
  productController.findProductById(req, res);
});

module.exports = router;
