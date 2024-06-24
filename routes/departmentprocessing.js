const express = require('express');
const router = express.Router();
const db = require('../models');

const AuthenticateToken = require('../services/authenticateToken');
const DepartmentProcessingService = require('../services/process/DepartmentProcessingService');
const DepartmentProcessingController = require('../controllers/process/PurchaseProcessingController');

// Instanciando o serviço e o controlador com os modelos e a instância do AuthenticateToken
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');
const departmentprocessingService = new DepartmentProcessingService(db.Department, db.CostCenter);
const departmentprocessingController = new DepartmentProcessingController(departmentprocessingService);

// Rota para criar um novo departamento
router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), async (req, res, next) => {
    try {
        const { nome } = req.body; // Supondo que o nome do departamento seja enviado no corpo da requisição
        const result = await departmentprocessingController.create(nome);
        res.status(201).json(result);
    } catch (error) {
        next(error); // Passando o erro para o próximo middleware de erro
    }
});

module.exports = router;
