//controllers/salesController.js


class TitleController {
    constructor(titleService) {
        this.titleService = titleService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
        const { numeroNotaFiscal, numeroParcela, valorOriginal, dataVencimento, situacao} = req.body;
        
        try {
            const newTitle = await this.titleService.create(numeroNotaFiscal, numeroParcela, valorOriginal, dataVencimento, situacao );
            res.status(200).json(newTitle);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo movimento" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
        const titleId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(titleId)) {
                return res.status(400).json({ error: "ID de movimento inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.titleService.update(titleId, updates);
    
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
  
    async findAllTitle(req, res) {
  
        const { page, pageSize } = req.query;
  
        try {
            const title = await this.titleService.findAllTitle(page, pageSize);
            res.status(200).json(title);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findTitleById(req, res) {
        const titleId = req.params.id;
        try {
            const title = await this.titleService.findTitleById(titleId);
            if (title) {
                res.status(200).json(title);
            } else {
                res.status(404).json({ error: "Registro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
  
   
    //--------------------------------------------------------------------------------------------------//
    
    async delete (req, res){
        const titleId = req.params.id;
    
        const title = await this.titleService.delete(titleId);
              if (title) {
                  res.status(200).json(title);
              } else {
                  res.status(404).json({ error: "Registro não deletado" });
              }
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
    
  
    //--------------------------------------------------------------------------------------------------//
  
  }
  
  module.exports = TitleController;
  