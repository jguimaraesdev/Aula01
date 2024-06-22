// ./routes/costCenter.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const CostCenterService = require('../services/moduloCompras/costCenterService');
const CostCenterController = require('../controllers/moduloCompras/costcenterController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const costCenterService = new CostCenterService(db.CostCenter, authenticateToken);
const costCenterController = new CostCenterController(costCenterService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  costCenterController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  costCenterController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  costCenterController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  costCenterController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  costCenterController.delete(req, res).catch(next);
});


//--------------------------------------------------------------------------------------------------//


module.exports = router;
