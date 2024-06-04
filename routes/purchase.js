// ./routes/purchase.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const PurchaseService = require('../services/moduloCompras/purchaseService');
const PurchaseController = require('../controllers/moduloCompras/purchaseController');

// Instanciando o serviço e o controlador
const purchaseService = new PurchaseService(db.Purchase);
const purchaseController = new PurchaseController(purchaseService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  purchaseController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  purchaseController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  purchaseController.findAllPurchases(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  purchaseController.findPurchaseById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  purchaseController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
