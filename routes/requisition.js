// ./routes/requisition.js
const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const RequisitionService = require('../services/moduloCompras/requisitionService');
const RequisitionController = require('../controllers/moduloCompras/requisitionController');

// Instanciando o serviço e o controlador
const requisitionService = new RequisitionService(db.Requisition,  authenticateToken);
const requisitionController = new RequisitionController(requisitionService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  requisitionController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  requisitionController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  requisitionController.findAllRequisition(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  requisitionController.findRequisitionById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  requisitionController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
