// ./routes/title.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const TitleService = require('../services/moduloVendas/titleService');
const TitleController = require('../controllers/moduloVendas/titleController');

// Instanciando o serviço e o controlador
const titleService = new TitleService(db.Title);
const titleController = new TitleController(titleService);

//--------------------------------------------------------------------------------------------------//
// Rotas
router.post('/newtitle', (req, res, next) => {
  titleController.create(req, res);
});

router.put('/updatetitle/:id', (req, res, next) => {
  titleController.update(req, res);
});

router.get('/findalltitle', (req, res, next) => {
  titleController.findAllTitle(req, res);
});

router.get('/findtitlebyid/:id', (req, res, next) => {
  titleController.findtitlebyid(req, res);
});

router.delete('/deletetitle/:id', (req, res, next) => {
  titleController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
