// ./routes/department.js
const express = require('express');
const router = express.Router();
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const db = require('../models');
const DepartmentService = require('../services/moduloUsuarios/departmentService');
const DepartmentController = require('../controllers/moduloUsuarios/departmentController');


// Instanciando o serviço e o controlador
const departmentService = new DepartmentService(db.Department);
const departmentController = new DepartmentController(departmentService);


//--------------------------------------------------------------------------------------------------//

// Rotas
router.post('/newdepartment', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  departmentController.create(req, res);
});

router.put('/updatedepartment/:id', (req, res, next) => {
  departmentController.update(req, res);
});

router.get('/findalldepartments', (req, res, next) => {
  departmentController.findAllDepartments(req, res);
});

router.get('/finddepartmentbyid/:id', (req, res, next) => {
  departmentController.findDepartmentById(req, res);
});

router.delete('/deletedepartment/:id', (req, res, next) => {
  departmentController.delete(req, res);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
