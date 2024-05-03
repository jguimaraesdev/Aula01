const express = require('express');
const router = express.Router();

const db = require('../models');
const XtelefoneService = require('../services/xtelefoneService');
const XtelefoneController = require('../controllers/xtelefoneController');

// Instanciando o serviço e o controlador
const xtelefoneService = new XtelefoneService(db.Xtelefone);
const xtelefoneController = new XtelefoneController(xtelefoneService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newxtelefone', (req, res, next) => {
  xtelefoneController.create(req, res);
});

router.get('/findallxtelefones', (req, res, next) => {
  xtelefoneController.findAllXtelefones(req, res);
});

router.get('/findXtelefonebyId/:id', (req, res, next) => {
    xtelefoneController.findXtelefoneById(req, res);
  });


//--------------------------------------------------------------------------------------------------//
module.exports = router;
