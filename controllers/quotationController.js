// ./controllers/quotationController.js

class QuotationController {
  constructor(quotationService) {
      this.quotationService = quotationService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { price, productId, supplierId, requisitionId } = req.body;
      try {
          const newQuotation = await this.quotationService.create(price, productId, supplierId, requisitionId);
          res.status(200).json(newQuotation);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a nova cotação" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const quotationId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(quotationId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.quotationService.update(quotationId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Cotação não encontrada", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllQuotations(req, res) {
      const { page, pageSize } = req.query;
      try {
          const quotations = await this.quotationService.findAllQuotations(page, pageSize);
          res.status(200).json(quotations);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar cotações" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findQuotationById(req, res) {
      const quotationId = req.params.id;
      try {
          const quotation = await this.quotationService.findQuotationById(quotationId);
          if (quotation) {
              res.status(200).json(quotation);
          } else {
              res.status(404).json({ error: "Cotação não encontrada" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getQuotationsBySupplier(req, res) {
      const supplierId = req.params.supplierId;
      try {
          const quotations = await this.quotationService.getQuotationsBySupplier(supplierId);
          res.status(200).json(quotations);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar cotações por fornecedor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete (req, res){
    try{
        await this.quotationService.delete(req.params.id);
        res.status(204).send();

    }catch(erro){
        res.status(400).json({ error: error.message});
    }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = QuotationController;
