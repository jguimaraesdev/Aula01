// ./controllers/MovimentsController.js
class MovementsProductController {
    constructor(movementsproductService) {
        this.movementsproductService = movementsproductService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId  } = req.body;
        try {
            const newMovement = await this.movementsproductService.create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId );
            res.status(200).json(newMovement);
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
            const { updatedRowsCount, updatedRows } = await this.movementsproductService.update(movementId, updates);
    
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

    async findAllMovements(req, res) {

        const { page, pageSize } = req.query;

        try {
            const movements = await this.movementsproductService.findAllMovements(page, pageSize);
            res.status(200).json(movements);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar movimentos' });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findMovementById(req, res) {
        const movementId = req.params.id;
        try {
            const movement = await this.movementsproductService.findMovementById(movementId);
            if (movement) {
                res.status(200).json(movement);
            } else {
                res.status(404).json({ error: "Movimento não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByDeposito(req, res) {
        const { depositoId, page = 1, pageSize = 10 } = req.params;
        try {
            const posicao = await this.movementsproductService.getPosicaoByDeposito(depositoId, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por depósito" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(req, res) {
        const { produtoId, depositoId, page = 1, pageSize = 10 } = req.params;
        try {
            const posicao = await this.movementsproductService.getPosicaoByProdutoDeposito(produtoId, depositoId, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por produto e depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async delete (req, res){
        try{
            await this.movementsproductService.delete(req.params.id);
            res.status(204).send();
    
        }catch(erro){
            res.status(400).json({ error: error.message});
        }
    }

    //--------------------------------------------------------------------------------------------------//

}

module.exports = MovementsProductController;
