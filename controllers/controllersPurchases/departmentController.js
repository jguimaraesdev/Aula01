// ./controllers/departmentController.js
class DepartmentController {
    constructor(departmentService) {
      this.departmentService = departmentService;
    }

    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
      try {
        const department = await this.departmentService.create(req.body);
        res.status(201).json(department);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    //--------------------------------------------------------------------------------------------------//
    
    async update(req, res) {
      try {
        await this.departmentService.update(req.params.id, req.body);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findAll(req, res) {
      try {
        const departments = await this.departmentService.findAll();
        res.status(200).json(departments);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
      try {
        const department = await this.departmentService.findById(req.params.id);
        if (department) {
          res.status(200).json(department);
        } else {
          res.status(404).json({ error: 'Department not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.departmentService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
    
  }
  
  module.exports = DepartmentController;
  