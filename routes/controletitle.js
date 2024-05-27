//./routes/movementtitle.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ControleTitleService = require('../services/moduloVendas/controletitleService');
const ControleTitleController = require('../controllers/moduloVendas/controletitleController');

// Instanciando o serviço e o controlador
const controletitleService = new ControleTitleService(db.ControleTitle);
const controletitleController = new ControleTitleController(controletitleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newcontrole', (req, res, next) => {
  controletitleController.create(req, res);
});

// Rota de atualização
router.put('/updatecontrole/:id', (req, res, next) => {
    controletitleController.update(req, res);
});

router.get('/findallcontrole', (req, res, next) => {
    controletitleController.findAllControleTitle(req, res);
});

router.get('/findallcontrolebyid/:id', (req, res, next) => {
    controletitleController.findControleTitleById(req, res);
});

router.delete('/deletecontrole/:id', (req, res, next) => {
    controletitleController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
