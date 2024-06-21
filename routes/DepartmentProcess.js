// ./routes/department.js
const express = require('express');
const router = express.Router();
const db = require('../models');

//department

const DepartmentProcessService = require('../services/process/DepartmentProcessService');
const DepartmentProcessController = require('../controllers/process/DepartmentProcessController');
const departmentprocessService = new DepartmentProcessService(db.Department, db.CostCenter);
const departmentprocessController = new DepartmentProcessController(departmentService);

//--------------------------------------------------------------------------------------------------//

router.post('/new', (req, res, next) => {
departmentprocessController.create(req, res).catch(next);

});