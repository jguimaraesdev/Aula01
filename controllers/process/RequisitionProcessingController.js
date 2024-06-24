// controllers/RequisitionProcessingController.js

class RequisitionProcessingController {
    constructor(RequisitionProcessingService) {
      this.requisitionProcessingService = RequisitionProcessingService;
    }
  
    async create(req, res) {
      const { produto_requerido, qtd_requerida, categoria, natureza_operacao, costCenterId, tipoPagamento } = req.body;
      const userId = req.userId;
      try {
        const result = await this.requisitionProcessingService.create(
          produto_requerido,
          qtd_requerida,
          categoria,
          natureza_operacao,
          userId,
          costCenterId,
          tipoPagamento
        );
        return res.status(200).json(result);
      } catch(error){
        console.error('Erro no controlador ao criar:', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
    }
    }
  }
  
  module.exports = RequisitionProcessingController;
  