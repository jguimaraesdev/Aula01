// controllers/TitleMovementController.js

class TitlePayController {
    constructor(TitlePayService) {
      this.titlepayservice = TitlePayService;
    }


     //--------------------------------------------------------------------------------------------------//
  
    async cancelarTitulo(req, res) {
      const { titleId } = req.params;
      try {
        const result = await this.titlepayservice.cancelarTitulo(titleId);
        return res.status(200).json(result);
      } catch(error){
        console.error('Erro no controlador ao criar :', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
    }
    }
  

     //--------------------------------------------------------------------------------------------------//

    async pagarIntegral(req, res) {
      const { cpf_cnpj, valor } = req.body;
      try {
        const result = await this.titlepayservice.pagarIntegral(cpf_cnpj, valor);
        return res.status(200).json(result);
      } catch(error){
        console.error('Erro no controlador ao criar :', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
    }
    }

     //--------------------------------------------------------------------------------------------------//

     async pagarParcial(req, res) {
      const { cpf_cnpj, valor } = req.body;
      try {
        const result = await this.titlepayservice.pagarParcial(cpf_cnpj, valor);
        return res.status(200).json(result);
      } catch(error){
        console.error('Erro no controlador ao criar :', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
    }
    }
    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = TitlePayController;
  