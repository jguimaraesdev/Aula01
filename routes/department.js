// ./routes/department.js
const express = require('express');
const router = express.Router();

const db = require('../models');
const DepartmentService = require('../services/departmentService');
const DepartmentController = require('../controllers/departmentController');


// Instanciando o serviço e o controlador
const departmentService = new DepartmentService(db.Department);
const departmentController = new DepartmentController(departmentService);


//--------------------------------------------------------------------------------------------------//

// Rotas
router.post('/new',(req, res, next) => {
  departmentController.create(req, res);
});

router.put('/update/:id', (req, res, next) => {
  departmentController.update(req, res);
});

router.get('/findall', (req, res, next) => {
  departmentController.findAll(req, res);
});

router.get('/findbyid/:id', (req, res, next) => {
  departmentController.findById(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  departmentController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
