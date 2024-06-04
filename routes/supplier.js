// ./routes/supplier.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

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
  supplierController.findAllSuppliers(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  supplierController.findSupplierById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  supplierController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
