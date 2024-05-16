// ./controllers/movimentsController.js
class MovimentsController {
    constructor(movimentsService) {
        this.movimentsService = movimentsService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId  } = req.body;
        try {
            const newMoviment = await this.movimentsService.create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId );
            res.status(200).json(newMoviment);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo movimento" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const movimentId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(movimentId)) {
                return res.status(400).json({ error: "ID de movimento inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.movimentsService.update(movimentId, updates);
    
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

    async findAllMoviments(req, res) {

        const { page, pageSize } = req.query;

        try {
            const moviments = await this.movimentsService.findAllMoviments(page, pageSize);
            res.status(200).json(moviments);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar movimentos' });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findMovimentById(req, res) {
        const movimentId = req.params.id;
        try {
            const moviment = await this.movimentsService.findMovimentById(movimentId);
            if (moviment) {
                res.status(200).json(moviment);
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
            const posicao = await this.movimentsService.getPosicaoByDeposito(depositoId, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por depósito" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(req, res) {
        const { produtoId, depositoId, page = 1, pageSize = 10 } = req.params;
        try {
            const posicao = await this.movimentsService.getPosicaoByProdutoDeposito(produtoId, depositoId, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por produto e depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
}

module.exports = MovimentsController;
