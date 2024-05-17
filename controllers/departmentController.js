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
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const { count, rows } = await this.departmentService.findAll(page, pageSize);
        res.status(200).json({
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          items: rows,
        });
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
  