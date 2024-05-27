// ./services/movimentsProductService.js
class MovementsProductService {
    constructor(MovementsProductModel) {
        this.MovementsProduct = MovementsProductModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId) {
        try {
            const newMovement = await this.MovementsProduct.create({
                movimento_tipo,
                qtd_disponivel,
                qtd_bloqueado,
                valor_faturado,
                productId, 
                depositId
            });
            return newMovement;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(id, updates) {
        try {
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.MovementsProduct.update(updates, {
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

    //--------------------------------------------------------------------------------------------------//

    async findAllMovements(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const allMovements = await this.MovementsProduct.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return allMovements;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findMovementById(id) {
        try {
            const movement = await this.MovementsProduct.findOne({ where: { id } });
            return movement;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async getPosicaoByDeposito(depositoId, page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const posicao = await this.MovementsProduct.findAndCountAll({
                where: { depositId: depositoId },
                limit: pageSize,
                offset: offset
            });
            return posicao;
        } catch (error) {
            throw error;
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(produtoId, depositoId, page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const posicao = await this.MovementsProduct.findAndCountAll({
                where: { productId: produtoId, depositId: depositoId },
                limit: pageSize,
                offset: offset
            });
            return posicao;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async delete(id){
        return this.MovementsProduct.delete({ where: { id }});
    }
}

module.exports = MovementsProductService;
