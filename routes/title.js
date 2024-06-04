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
router.post('/new', (req, res, next) => {
  titleController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  titleController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  titleController.findAllTitle(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  titleController.findtitlebyid(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  titleController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
