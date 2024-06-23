// controllers/TitleMovementController.js

class TitleMovementController {
    constructor(TitleMovementService) {
      this.titleMovementService = TitleMovementService;
    }


     //--------------------------------------------------------------------------------------------------//
  
    async cancelarTitulo(req, res) {
      const { titleId } = req.params;
      try {
        const result = await this.titleMovementService.cancelarTitulo(titleId);
        return res.status(200).json(result);
      } catch (error) {
        console.error('Erro ao cancelar título:', error);
        return res.status(500).json({ error: 'Erro ao cancelar título' });
      }
    }
  

     //--------------------------------------------------------------------------------------------------//

    async pagarParcela(req, res) {
      const { titleId } = req.params;
      try {
        const result = await this.titleMovementService.pagarParcela(titleId);
        return res.status(200).json(result);
      } catch (error) {
        console.error('Erro ao pagar parcela:', error);
        return res.status(500).json({ error: 'Erro ao pagar parcela' });
      }
    }

     //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = TitleMovementController;
  