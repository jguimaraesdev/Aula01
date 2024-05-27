// ./controllers/ControleTitleController.js

class ControleTitleController {
    constructor(controletitleService) {
        this.controletitleService = controletitleService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { tipoMovimento, valorMovimento, valorMulta, valorJuros, titleId} = req.body;
        
        try {
            const newControleTitle = await this.controletitleService.create(
                tipoMovimento, 
                valorMovimento, 
                valorMulta, 
                valorJuros, 
                titleId
            );
            res.status(200).json(newControleTitle);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo movimento" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const movementId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(movementId)) {
                return res.status(400).json({ error: "ID de movimento inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.controletitleService.update(movementId, updates);
    
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

    async findAllControleTitle(req, res) {

        const { page, pageSize } = req.query;

        try {
            const newmovements = await this.controletitleService.findAllControleTitle(page, pageSize);
            res.status(200).json(newmovements);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar movimentos' });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findControleTitleById(req, res) {
        const movementId = req.params.id;
        try {
            const newmovement = await this.controletitleService.findControleTitleById(movementId);
            if (newmovement) {
                res.status(200).json(newmovement);
            } else {
                res.status(404).json({ error: "Movimento não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }



    //--------------------------------------------------------------------------------------------------//
    
    async delete(req, res) {
        const movementId = req.params.id;
    
        try {
            const movement = await this.controletitleService.delete(movementId);
            if (movement) {
                res.status(200).json(movement);
            } else {
                res.status(404).json({ error: "Registro não deletado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    

    //--------------------------------------------------------------------------------------------------//

}

module.exports = ControleTitleController;
