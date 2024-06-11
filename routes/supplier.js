// ./routes/supplier.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const SupplierService = require('../services/aprovisionamento/supplierService');
const SupplierController = require('../controllers/aprovisionamento/supplierController');

// Instanciando o serviço e o controlador
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  supplierController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  supplierController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  supplierController.findAll(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  supplierController.findById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  supplierController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
