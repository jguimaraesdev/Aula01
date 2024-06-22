// controllers/process/SellProcessingController.js

class SellProcessingController {
    constructor(sellProcessingService) {
      this.sellProcessingService = sellProcessingService;
    }
  
    async create(req, res) {
      const { produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, valor, tipoMovimento, tipoPagamento, clienteId } = req.body;
  
      try {
        const result = await this.sellProcessingService.create({
          produto_requerido,
          qtd_requerida,
          categoria,
          natureza_operacao,
          userId,
          costCenterId,
          valor,
          tipoMovimento,
          tipoPagamento,
          clienteId
        });
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao processar venda' });
      }
    }
  }
  
  module.exports = SellProcessingController;
  