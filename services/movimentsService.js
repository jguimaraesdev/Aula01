// ./services/movimentsService.js
class MovimentsService {
    constructor(movimentsModel) {
        this.Moviments = movimentsModel;
    }

    async create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_unitario) {
        try {
            const newMoviment = await this.Moviments.create({
                movimento_tipo,
                qtd_disponivel,
                qtd_bloqueado,
                valor_unitario
            });
            return newMoviment;
        } catch (error) {
            throw error;
        }
    }

    async update(id, updates) {
        try {
            const [updatedRowsCount, updatedRows] = await this.Moviments.update(updates, {
                where: { id },
                returning: true // Para retornar os registros atualizados
            });
            return { updatedRowsCount, updatedRows };
        } catch (error) {
            throw error;
        }
    }

    async findAllMoviments() {
        try {
            const allMoviments = await this.Moviments.findAll();
            return allMoviments;
        } catch (error) {
            throw error;
        }
    }

    async findMovimentById(id) {
        try {
            const moviment = await this.Moviments.findOne({ where: { id } });
            return moviment;
        } catch (error) {
            throw error;
        }
    }

    // Aqui você pode adicionar outras funções conforme necessário
}

module.exports = MovimentsService;
