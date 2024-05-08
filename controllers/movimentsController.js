// ./controllers/movimentsController.js
class MovimentsController {
    constructor(movimentsService) {
        this.movimentsService = movimentsService;
    }

    async create(req, res) {
        const { movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_unitario } = req.body;
        try {
            const newMoviment = await this.movimentsService.create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_unitario);
            res.status(200).json(newMoviment);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir novo movimento" });
        }
    }

    async update(req, res) {
        const movimentId = req.params.id;
        const updates = req.body;
        try {
            const { updatedRowsCount, updatedRows } = await this.movimentsService.update(movimentId, updates);
            if (updatedRowsCount > 0) {
                res.status(200).json(updatedRows);
            } else {
                res.status(404).json({ error: "Movimento não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar movimento" });
        }
    }

    async findAllMoviments(req, res) {
        try {
            const moviments = await this.movimentsService.findAllMoviments();
            res.status(200).json(moviments);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar movimentos' });
        }
    }

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

    // Aqui você pode adicionar outras funções conforme necessário
}

module.exports = MovimentsController;
