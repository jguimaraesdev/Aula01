// controllers/RequisitionProcessingController.js

class RequisitionProcessingController {
    constructor(RequisitionProcessingService) {
      this.requisitionProcessingService = RequisitionProcessingService;
    }
  
    async processRequisition(req, res) {
      const { produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, tipoPagamento } = req.body;
      try {
        const result = await this.requisitionProcessingService.processRequisition({
          produto_requerido,
          qtd_requerida,
          categoria,
          natureza_operacao,
          userId,
          costCenterId,
          tipoPagamento
        });
        return res.status(200).json(result);
      } catch (error) {
        console.error('Erro ao processar requisição:', error);
        return res.status(500).json({ error: 'Erro ao processar requisição' });
      }
    }
  }
  
  module.exports = RequisitionProcessingController;
  