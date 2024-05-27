//controllers/salesController.js


class SalesController {
  constructor(salesService) {
      this.salesService = salesService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { qtdVendida, custoUnitario, parcelas, numeroNotaFiscal} = req.body;
      const productId = req.userId;

      try {
          const newSales = await this.salesService.create(qtdVendida, custoUnitario, parcelas, numeroNotaFiscal, productId );
          res.status(200).json(newSales);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir novo movimento" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const salesId = req.params.id;
      const updates = req.body;
      try {
          // Verificar se o ID do depósito é um número válido
          if (isNaN(salesId)) {
              return res.status(400).json({ error: "ID de movimento inválido" });
          }
  
          // Verificar se os dados de atualização estão presentes
          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }
  
          // Chamar o método update da DepositService para realizar a atualização
          const { updatedRowsCount, updatedRows } = await this.salesService.update(salesId, updates);
  
          // Verificar se o depósito foi encontrado e atualizado com sucesso
          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso", updatedRowsCount, updatedRows });
          } else {
              return res.status(404).json({ error: "Registro não encontrado" });
          }
      } catch (error) {
          // Tratar erros gerais
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllSales(req, res) {

      const { page, pageSize } = req.query;

      try {
          const sales = await this.salesService.findAllSales(page, pageSize);
          res.status(200).json(sales);
      } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar registros' });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findSalesById(req, res) {
      const salesId = req.params.id;
      try {
          const sales = await this.salesService.findSalesById(salesId);
          if (sales) {
              res.status(200).json(sales);
          } else {
              res.status(404).json({ error: "Registro não encontrado" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

 
  //--------------------------------------------------------------------------------------------------//
  
  async delete (req, res){
      try{
          await this.salesService.delete(req.params.id);
          res.status(204).send();
  
      }catch(erro){
          res.status(400).json({ error: error.message});
      }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = SalesController;
