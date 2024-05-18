// ./routes/costCenter.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const CostCenterService = require('../services/costCenterService');
const CostCenterController = require('../controllers/costCenterController');

// Instanciando o serviço e o controlador
const costCenterService = new CostCenterService(db.CostCenter);
const costCenterController = new CostCenterController(costCenterService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newcostcenter', (req, res, next) => {
  costCenterController.create(req, res);
});

router.put('/updatecostcenter/:id', (req, res, next) => {
  costCenterController.update(req, res);
});

router.get('/findallcostcenters', (req, res, next) => {
  costCenterController.findAllCostCenters(req, res);
});

router.get('/findcostcenterbyid/:id', (req, res, next) => {
  costCenterController.findCostCenterById(req, res);
});

router.delete('/deletecostcenter/:id', (req, res, next) => {
  costCenterController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//


module.exports = router;
