// ./routes/department.js
const express = require('express');
const router = express.Router();
const db = require('../models');

//department
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const DepartmentProcessingService = require('../services/process/DepartmentProcessingService');
const DepartmentProcessingController = require('../controllers/process/PurchaseProcessingController');
const departmentprocessingService = new DepartmentProcessingService(db.Department, db.CostCenter, authenticateToken, db.sequelize);
const departmentprocessingController = new DepartmentProcessingController(departmentprocessingService);

//--------------------------------------------------------------------------------------------------//

router.post('/new', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
    departmentprocessingController.create(req, res).catch(next);

});


module.exports = router;