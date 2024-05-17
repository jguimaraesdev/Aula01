// ./controllers/supplierController.js
class SupplierController {
    constructor(supplierService) {
      this.supplierService = supplierService;
    }

    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
      try {
        const supplier = await this.supplierService.create(req.body);
        res.status(201).json(supplier);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
      try {
        await this.supplierService.update(req.params.id, req.body);
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
        const { count, rows } = await this.supplierService.findAll(page, pageSize);
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
        const supplier = await this.supplierService.findById(req.params.id);
        if (supplier) {
          res.status(200).json(supplier);
        } else {
          res.status(404).json({ error: 'Supplier not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.supplierService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = SupplierController;
  