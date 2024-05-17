// ./routes/requisition.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const RequisitionService = require('../services/requisitionService');
const RequisitionController = require('../controllers/requisitionController');

// Instanciando o serviço e o controlador
const requisitionService = new RequisitionService(db.Requisition);
const requisitionController = new RequisitionController(requisitionService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newrequisition', (req, res, next) => {
  requisitionController.create(req, res);
});

router.put('/updaterequisition/:id', (req, res, next) => {
  requisitionController.update(req, res);
});

router.get('/findallrequisitions', (req, res, next) => {
  requisitionController.findAll(req, res);
});

router.get('/findrequisitionbyid/:id', (req, res, next) => {
  requisitionController.findById(req, res);
});

router.delete('/deleterequisition/:id', (req, res, next) => {
  requisitionController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
