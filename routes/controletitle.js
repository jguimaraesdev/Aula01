//./routes/movementtitle.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const ControleTitleService = require('../services/moduloContas/controletitleService');
const ControleTitleController = require('../controllers/moduloContas/controletitleController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const controletitleService = new ControleTitleService(db.ControleTitle, authenticateToken);
const controletitleController = new ControleTitleController(controletitleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  controletitleController.create(req, res).catch(next);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
    controletitleController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
    controletitleController.findAllControleTitle(req, res).catch(next);
});

router.get('/findallbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
    controletitleController.findControleTitleById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
    controletitleController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//
module.exports = router;
