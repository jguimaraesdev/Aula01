// ./controllers/purchaseController.js
class PurchaseController {
    constructor(purchaseService) {
      this.purchaseService = purchaseService;
    }

    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
      try {
        const purchase = await this.purchaseService.create(req.body);
        res.status(201).json(purchase);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
      try {
        await this.purchaseService.update(req.params.id, req.body);
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
        const { count, rows } = await this.purchaseService.findAll(page, pageSize);
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
        const purchase = await this.purchaseService.findById(req.params.id);
        if (purchase) {
          res.status(200).json(purchase);
        } else {
          res.status(404).json({ error: 'Purchase not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      try {
        await this.purchaseService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = PurchaseController;
  