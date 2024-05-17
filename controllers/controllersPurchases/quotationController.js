// ./controllers/quotationController.js
class QuotationController {
    constructor(quotationService) {
      this.quotationService = quotationService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
      try {
        const quotation = await this.quotationService.create(req.body);
        res.status(201).json(quotation);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
      try {
        await this.quotationService.update(req.params.id, req.body);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findAll(req, res) {
      try {
        const quotations = await this.quotationService.findAll();
        res.status(200).json(quotations);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
      try {
        const quotation = await this.quotationService.findById(req.params.id);
        if (quotation) {
          res.status(200).json(quotation);
        } else {
          res.status(404).json({ error: 'Quotation not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.quotationService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = QuotationController;
  