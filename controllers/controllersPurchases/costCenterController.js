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
        const costCenters = await this.costCenterService.findAll();
        res.status(200).json(costCenters);
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
  