//./routes/movementtitle.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ControleTitleService = require('../services/moduloContas/controletitleService');
const ControleTitleController = require('../controllers/moduloContas/controletitleController');

// Instanciando o serviço e o controlador
const controletitleService = new ControleTitleService(db.ControleTitle);
const controletitleController = new ControleTitleController(controletitleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', (req, res, next) => {
  controletitleController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', (req, res, next) => {
    controletitleController.update(req, res).catch(next);
});

router.get('/findall', (req, res, next) => {
    controletitleController.findAllControleTitle(req, res).catch(next);
});

router.get('/findallbyid/:id', (req, res, next) => {
    controletitleController.findControleTitleById(req, res).catch(next);
});

router.delete('/delete/:id', (req, res, next) => {
    controletitleController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
