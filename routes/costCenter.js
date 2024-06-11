// ./routes/costCenter.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const CostCenterService = require('../services/moduloCompras/costCenterService');
const CostCenterController = require('../controllers/moduloCompras/costCenterController');

// Instanciando o serviço e o controlador
const costCenterService = new CostCenterService(db.CostCenter);
const costCenterController = new CostCenterController(costCenterService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  costCenterController.create(req, res).catch(next);
});

router.put('/update/:id', (req, res, next) => {
  costCenterController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
  costCenterController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', (req, res, next) => {
  costCenterController.findById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
  costCenterController.delete(req, res).catch(next);
});


//--------------------------------------------------------------------------------------------------//


module.exports = router;
