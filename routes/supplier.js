// ./routes/supplier.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const SupplierService = require('../services/aprovisionamento/supplierService');
const SupplierController = require('../controllers/aprovisionamento/supplierController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const supplierService = new SupplierService(db.Supplier, authenticateToken);
const supplierController = new SupplierController(supplierService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  supplierController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  supplierController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  supplierController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  supplierController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  supplierController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
