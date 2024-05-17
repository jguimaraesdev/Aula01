// ./controllers/costCenterController.js
class CostCenterController {
    constructor(costCenterService) {
      this.costCenterService = costCenterService;
    }
    
    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
      try {
        const costCenter = await this.costCenterService.create(req.body);
        res.status(201).json(costCenter);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
      try {
        await this.costCenterService.update(req.params.id, req.body);
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
        const { count, rows } = await this.costCenterService.findAll(page, pageSize);
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
        const costCenter = await this.costCenterService.findById(req.params.id);
        if (costCenter) {
          res.status(200).json(costCenter);
        } else {
          res.status(404).json({ error: 'Cost Center not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.costCenterService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
    
  }
  
  module.exports = CostCenterController;
  