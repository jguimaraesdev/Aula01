const express = require('express');
const router = express.Router();
const db = require('../models');

const AuthenticateToken = require('../services/authenticateToken');
const DepartmentProcessingService = require('../services/process/DepartmentProcessingService');
const DepartmentProcessingController = require('../controllers/process/DepartmentProcessingController');

// Instanciando o serviço e o controlador com os modelos e a instância do AuthenticateToken
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');
const departmentprocessingService = new DepartmentProcessingService(db.Department, db.CostCenter, db.sequelize);
const departmentprocessingController = new DepartmentProcessingController(departmentprocessingService);

// Rota para criar um novo departamento
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), async (req, res, next) => {
departmentprocessingController.create(req, res).catch(next);
});
    
    

module.exports = router;
