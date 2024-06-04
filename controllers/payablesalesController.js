//controllers/salesController.js


class PayableSalesController {
  constructor(PayableSalesService) {
      this.payablesalesService = PayableSalesService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { valor, tipoMovimento, dataVencimento, tipoPagamento, notafiscalId} = req.body;
      
      try {
          const result = await this.payablesalesService.create(valor, tipoMovimento, dataVencimento, tipoPagamento, notafiscalId);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir registro" });
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
  
          
          const { updatedRowsCount, updatedRows } = await this.payablesalesService.update(Id, updates);
  
          
          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso", updatedRowsCount, updatedRows });
          } else {
              return res.status(404).json({ error: "Registro não encontrado" });
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
          const result = await this.payablesalesService.findAll(page, pageSize);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar registros' });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findById(req, res) {
      const Id = req.params.id;
      try {
          const result = await this.payablesalesService.findById(Id);
          if (result) {
              res.status(200).json(result);
          } else {
              res.status(404).json({ error: "Registro não encontrado" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

 
  //--------------------------------------------------------------------------------------------------//
  
  async delete (req, res){
    const Id = req.params.id;

    const result = await this.payablesalesService.delete(Id);
          if (result) {
              res.status(200).json(result);
          } else {
              res.status(404).json({ error: "Registro não deletado" });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }

  

  //--------------------------------------------------------------------------------------------------//

}

module.exports = PayableSalesController;
