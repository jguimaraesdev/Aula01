// ./controllers/QuotationController.js

class QuotationController {
  constructor(quotationService) {
      this.quotationService = quotationService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { preco, productId, supplierId, requisitionId } = req.body;
      try {
          const result = await this.quotationService.create(preco, productId, supplierId, requisitionId);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a novo Registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const Id = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(Id)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.quotationService.update(Id, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Registro não encontrada", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAll(req, res) {
      const { page, pageSize } = req.query;
      try {
          const result = await this.quotationService.findAll(page, pageSize);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar registros" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findById(req, res) {
      const Id = req.params.id;
      try {
          const result = await this.quotationService.finById(Id);
          if (result) {
              res.status(200).json(result);
          } else {
              res.status(404).json({ error: "Registro não encontrada" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete (req, res){
    const quotationId = req.params.id;

    const quotation = await this.quotationService.delete(quotationId);
          if (quotation) {
              res.status(200).json(quotation);
          } else {
              res.status(404).json({ error: "Registro não deletado" });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
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

  
}

module.exports = QuotationController;
