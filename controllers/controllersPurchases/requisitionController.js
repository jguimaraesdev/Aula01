// ./controllers/requisitionController.js
class RequisitionController {
    constructor(requisitionService) {
      this.requisitionService = requisitionService;
    }

    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
      try {
        const requisition = await this.requisitionService.create(req.body);
        res.status(201).json(requisition);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
      try {
        await this.requisitionService.update(req.params.id, req.body);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findAll(req, res) {
      try {
        const requisitions = await this.requisitionService.findAll();
        res.status(200).json(requisitions);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
      try {
        const requisition = await this.requisitionService.findById(req.params.id);
        if (requisition) {
          res.status(200).json(requisition);
        } else {
          res.status(404).json({ error: 'Requisition not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.requisitionService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = RequisitionController;
  