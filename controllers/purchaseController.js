// ./controllers/purchaseController.js

class PurchaseController {
  constructor(purchaseService) {
      this.purchaseService = purchaseService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { quantity, unitCost, status, supplierId, quotationId, userId, productId } = req.body;
      try {
          const newPurchase = await this.purchaseService.create(
              quantity, unitCost, status, supplierId, quotationId, userId, productId
          );
          res.status(200).json(newPurchase);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a nova compra" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const purchaseId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(purchaseId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.purchaseService.update(purchaseId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Compra não encontrada", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllPurchases(req, res) {
      const { page, pageSize } = req.query;
      try {
          const purchases = await this.purchaseService.findAllPurchases(page, pageSize);
          res.status(200).json(purchases);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar compras" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findPurchaseById(req, res) {
      const purchaseId = req.params.id;
      try {
          const purchase = await this.purchaseService.findPurchaseById(purchaseId);
          if (purchase) {
              res.status(200).json(purchase);
          } else {
              res.status(404).json({ error: "Compra não encontrada" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getPurchasesBySupplier(req, res) {
      const supplierId = req.params.supplierId;
      try {
          const purchases = await this.purchaseService.getPurchasesBySupplier(supplierId);
          res.status(200).json(purchases);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar compras por fornecedor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete (req, res){
    try{
        await this.purchaseService.delete(req.params.id);
        res.status(204).send();

    }catch(erro){
        res.status(400).json({ error: error.message});
    }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = PurchaseController;
