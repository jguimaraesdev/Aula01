// controllers/RequisitionProcessingController.js

class RequisitionProcessingController {
    constructor(RequisitionProcessingService) {
      this.requisitionProcessingService = RequisitionProcessingService;
    }
  
    async create(req, res) {
      const { produto_requerido, categoria, natureza_operacao, qtd_requerida, costCenterId} = req.body;
      const userId = req.userId;
      try {
        const result = await this.requisitionProcessingService.create(
          produto_requerido, categoria, natureza_operacao, qtd_requerida, userId, costCenterId
        );
        return res.status(200).json(result);
      } catch(error){
        console.error('Erro no controlador ao criar:', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
    }
    }
  }
  
  module.exports = RequisitionProcessingController;
  