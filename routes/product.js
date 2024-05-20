//./routes/product.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Instanciando o serviço e o controlador
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newproduct', (req, res, next) => {
  productController.create(req, res);
});

// Rota de atualização
router.put('/updateProduct/:id', (req, res, next) => {
  productController.update(req, res);
});

router.get('/findallproduct', (req, res, next) => {
  productController.findAllProduct(req, res);
});

router.get('/findallproductbyid/:id', (req, res, next) => {
  productController.findProductById(req, res);
});

router.delete('/deletecproduct/:id', (req, res, next) => {
  productController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
