// routes/requisitionProcessing.js

const express = require('express');
const router = express.Router();
const db = require('../models');
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('SUA_CHAVE_SECRETA');

const RequisitionProcessingController = require('../controllers/process/RequisitionProcessingController');
const RequisitionProcessingService = require('../services/process/RequisitionProcessingService');


const requisitionProcessingService = new RequisitionProcessingService(
    db.Requisition, 
    db.ControleProduct, 
    db.Quotation, 
    db.Supplier,
    db.Product, 
    db.sequelize,
    authenticateToken
);

const requisitionprocessingcontroller = new RequisitionProcessingController(requisitionProcessingService);

router.post('/new', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
    requisitionprocessingcontroller.create(req, res).catch(next);
});

module.exports = router;
