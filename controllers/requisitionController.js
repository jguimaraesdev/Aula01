// ./controllers/requisitionController.js

class RequisitionController {
  constructor(requisitionService) {
      this.requisitionService = requisitionService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { quantity_required, status, productId } = req.body;
      const userId = req.userId; // Suponho que você tenha o ID do usuário na requisição
      try {
          const newRequisition = await this.requisitionService.create(quantity_required, status, userId, productId);
          res.status(200).json(newRequisition);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a nova requisição" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const requisitionId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(requisitionId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.requisitionService.update(requisitionId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Requisição não encontrada", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllRequisition(req, res) {
      const { page, pageSize } = req.query;
      try {
          const requisitions = await this.requisitionService.findAllRequisition(page, pageSize);
          res.status(200).json(requisitions);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar requisições" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findRequisitionById(req, res) {
      const requisitionId = req.params.id;
      try {
          const requisition = await this.requisitionService.findRequisitionById(requisitionId);
          if (requisition) {
              res.status(200).json(requisition);
          } else {
              res.status(404).json({ error: "Requisição não encontrada" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getPosicaoByDeposito(req, res) {
      const depositoId = req.params.depositoId;
      try {
          const posicao = await this.requisitionService.getPosicaoByDeposito(depositoId);
          res.status(200).json(posicao);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar posição por depósito" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getPosicaoByProdutoDeposito(req, res) {
      const { produtoId, depositoId } = req.params;
      try {
          const posicao = await this.requisitionService.getPosicaoByProdutoDeposito(produtoId, depositoId);
          res.status(200).json(posicao);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar posição por produto e depósito" });
      }
  }

  //--------------------------------------------------------------------------------------------------//
}

module.exports = RequisitionController;
