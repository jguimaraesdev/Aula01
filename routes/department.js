// ./routes/department.js
const express = require('express');
const router = express.Router();
const db = require('../models');

//department

const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const DepartmentService = require('../services/aprovisionamento/departmentService');
const DepartmentController = require('../controllers/aprovisionamento/departmentController');
const departmentService = new DepartmentService(db.Department, authenticateToken);
const departmentController = new DepartmentController(departmentService);

//--------------------------------------------------------------------------------------------------//

router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
departmentController.create(req, res).catch(next);
});

router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  departmentController.update(req, res).catch(next);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  departmentController.findAll(req, res).catch(next);
});

router.get('/findbyid/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  departmentController.findById(req, res).catch(next);
});

router.delete('/delete/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  departmentController.delete(req, res).catch(next);
});


//--------------------------------------------------------------------------------------------------//

module.exports = router;
