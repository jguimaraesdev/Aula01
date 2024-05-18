// ./routes/requisition.js
const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const RequisitionService = require('../services/requisitionService');
const RequisitionController = require('../controllers/requisitionController');

// Instanciando o serviço e o controlador
const requisitionService = new RequisitionService(db.Requisition,  authenticateToken);
const requisitionController = new RequisitionController(requisitionService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newrequisition', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  requisitionController.create(req, res);
});

router.put('/updaterequisition/:id', (req, res, next) => {
  requisitionController.update(req, res);
});

router.get('/findallrequisitions', (req, res, next) => {
  requisitionController.findAllRequisition(req, res);
});

router.get('/findrequisitionbyid/:id', (req, res, next) => {
  requisitionController.findRequisitionById(req, res);
});

router.delete('/deleterequisition/:id', (req, res, next) => {
  requisitionController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
