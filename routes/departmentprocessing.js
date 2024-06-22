// ./routes/department.js
const express = require('express');
const router = express.Router();
const db = require('../models');

//department

const DepartmentProcessingService = require('../services/process/DepartmentProcessingService');
const DepartmentProcessingController = require('../controllers/process/PurchaseProcessingController');
const departmentprocessingService = new DepartmentProcessingService(db.Department, db.CostCenter);
const departmentprocessingController = new DepartmentProcessingController(departmentprocessingService);

//--------------------------------------------------------------------------------------------------//

router.post('/new', (req, res, next) => {
    departmentprocessingController.create(req, res).catch(next);

});


module.exports = router;