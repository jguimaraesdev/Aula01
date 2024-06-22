// ./routes/title.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const TitleService = require('../services/moduloContas/titleService');
const TitleController = require('../controllers/moduloContas/titleController');

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

// Instanciando o serviço e o controlador
const titleService = new TitleService(db.Title, authenticateToken);
const titleController = new TitleController(titleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  titleController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  titleController.update(req, res).catch(next);
});

router.get('/findall',authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  titleController.findAllTitle(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  titleController.findtitlebyid(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  titleController.delete(req, res).catch(next);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
