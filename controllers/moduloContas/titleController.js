//controllers/salesController.js


class TitleController {
    constructor(titleService) {
        this.titleService = titleService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
        const { notafiscalId, numeroParcela, valorParcela,  status} = req.body;
        
        try {
            const result = await this.titleService.create(notafiscalId, numeroParcela, valorParcela, status );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo registro" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
        const Id = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(Id)) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.titleService.update(Id, updates);
    
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
  
    async findAll(req, res) {
  
        const { page, pageSize } = req.query;
  
        try {
            const result = await this.titleService.findAll(page, pageSize);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
        const Id = req.params.id;
        try {
            const result = await this.titleService.findById(Id);
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
    
        const result = await this.titleService.delete(Id);
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
  
  module.exports = TitleController;
  