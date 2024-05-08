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
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.Moviments.update(updates, {
                where: { id },
            });
            // Verificar se algum registro foi atualizado
            if (updatedRowsCount === 0) {
                throw new Error("Nenhum registro encontrado para atualização");
            } else {
                // Retornar algo específico para indicar que a atualização foi bem-sucedida
                return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
            }
        } catch (error) {
            // Lançar novamente o erro para ser tratado na camada de controle
            throw error;
        }
           
    }

    async findAllMoviments(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const allMoviments = await this.Moviments.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
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
