//./routes/movementtitle.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const MovementTitleService = require('../services/moduloVendas/movementtitleService');
const MovementTitleController = require('../controllers/moduloVendas/movementtitleController');

// Instanciando o serviço e o controlador
const movementtitleService = new MovementTitleService(db.MovimentTitle);
const movementtitleController = new MovementTitleController(movementtitleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newmovement', (req, res, next) => {
  movementtitleController.create(req, res);
});

// Rota de atualização
router.put('/updatemovement/:id', (req, res, next) => {
    movementtitleController.update(req, res);
});

router.get('/findallmovement', (req, res, next) => {
    movementtitleController.findAllMovimentTitle(req, res);
});

router.get('/findallmovementbyid/:id', (req, res, next) => {
    movementtitleController.findMovimentTitleById(req, res);
});

router.delete('/deletemovement/:id', (req, res, next) => {
    movementtitleController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
