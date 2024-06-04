//controllers/notafiscalController.js


class NotaFiscalController {
    constructor(notafiscalService) {
        this.notafiscalService = notafiscalService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
        const { nome_razao, CNPJ, cpf, natureza_operacao, productId} = req.body;
        
        try {
            const newRegistro = await this.notafiscalService.create(nome_razao, CNPJ, cpf, natureza_operacao, productId);
            res.status(200).json(newRegistro);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo Registro" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
        const notafiscalId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(notafiscalId)) {
                return res.status(400).json({ error: "ID de Registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.notafiscalService.update(notafiscalId, updates);
    
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
  
    async findAllNotafiscal(req, res) {
  
        const { page, pageSize } = req.query;
  
        try {
            const registro = await this.notafiscalService.findAllNotafiscal(page, pageSize);
            res.status(200).json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findNotafiscalById(req, res) {
        const notafiscalId = req.params.id;
        try {
            const registro = await this.notafiscalService.findNotaFiscalById(notafiscalId);
            if (registro) {
                res.status(200).json(registro);
            } else {
                res.status(404).json({ error: "Registro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
  
   
    //--------------------------------------------------------------------------------------------------//
    
    async delete (req, res){
      const notafiscalId = req.params.id;
  
      const sales = await this.notafiscalService.delete(notafiscalId);
            if (sales) {
                res.status(200).json(sales);
            } else {
                res.status(404).json({ error: "Registro não deletado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
  
    
  
    //--------------------------------------------------------------------------------------------------//
  
  }
  
  module.exports = NotaFiscalController;
  