//controllers/notafiscalController.js


class NotaFiscalController {
    constructor(notafiscalService) {
        this.notafiscalService = notafiscalService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
        const {
            natureza_operacao, 
            cnpj_cpf_comprador, 
            nome_razao_comprador, 
            descricao_produto, 
            quantidade, 
            cnpj_cpf_emitente, 
            nome_razao_emitente, 
            valor_nota} = req.body;
        
        try {
            const result = await this.notafiscalService.create(
                natureza_operacao, 
                cnpj_cpf_comprador, 
                nome_razao_comprador, 
                descricao_produto, 
                quantidade, 
                cnpj_cpf_emitente, 
                nome_razao_emitente, 
                valor_nota
        );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo Registro" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
        const Id = req.params.id;
        const updates = req.body;
        try {
            
            if (isNaN(Id)) {
                return res.status(400).json({ error: "ID de Registro inválido" });
            }
    
            
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            
            const { updatedRowsCount, updatedRows } = await this.notafiscalService.update(Id, updates);
    
            
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
  
    async findAll(req, res) {
  
        const { page, pageSize } = req.query;
  
        try {
            const registro = await this.notafiscalService.findAll(page, pageSize);
            res.status(200).json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
        const Id = req.params.id;
        try {
            const result = await this.notafiscalService.findById(Id);
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
  
      const result = await this.notafiscalService.delete(Id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "Registro não deletado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
  
    
  
    //--------------------------------------------------------------------------------------------------//
  
  }
  
  module.exports = NotaFiscalController;
  