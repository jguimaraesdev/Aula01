// ./controllers/RequisitionController.js

class RequisitionController {
  constructor(requisitionService) {
      this.requisitionService = requisitionService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { produto_requerido, qtd_requerida, status, costCenterId} = req.body;
      const userId = req.userId; // Suponho que você tenha o ID do usuário na requisição
      try {
          const result = await this.requisitionService.create(produto_requerido, qtd_requerida, status, userId, costCenterId);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a novo registro" });
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

          const { updatedRowsCount, updatedRows } = await this.requisitionService.update(Id, updates);

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
          const result = await this.requisitionService.findAll(page, pageSize);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar registros" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findById(req, res) {
      const Id = req.params.id;
      try {
          const result = await this.requisitionService.findById(Id);
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

    const result = await this.requisitionService.delete(Id);
          if (result) {
              res.status(200).json(result);
          } else {
              res.status(404).json({ error: "Registro não deletado" });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }

    
  //--------------------------------------------------------------------------------------------------//

  
  async RequisitionByCostCenter (req, res) {
    const { costCenterId , page = 1, pageSize = 10 } = req.params
    if (!costCenterId) {
        return res.status(400).json({ error: "O ID da requisição é obrigatório" });
      }
      try {
          const posicao = await this.requisitionService.getRequisitionByCostCenter(costCenterId, page, pageSize);
          if (!posicao || posicao .length === 0) {
            return res.status(404).json({ error: "Nenhuma posicao encontrada para a requisição" });
          }
          res.status(200).json(posicao);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar centro de custo por requisição" });
      }
    }

  //--------------------------------------------------------------------------------------------------//


};

module.exports = RequisitionController;
