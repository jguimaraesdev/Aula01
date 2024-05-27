// ./services/movimentsProductService.js
class MovementProductService {
    constructor(MovementProductModel) {
        this.MovementProduct = MovementProductModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId) {
        try {
            const newMovement = await this.MovementProduct.create({
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
            const [updatedRowsCount, updatedRows] = await this.MovementProduct.update(updates, {
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
            const allMovements = await this.MovementProduct.findAndCountAll({
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
            const movement = await this.MovementProduct.findOne({ where: { id } });
            return movement;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async getPosicaoByDeposito(depositoId, page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const posicao = await this.MovementProduct.findAndCountAll({
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
            const posicao = await this.MovementProduct.findAndCountAll({
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
    
    async delete(id) {
        try {
          const result = await this.MovementProduct.destroy({
            where: { id: id }
          });
      
          if (result === 0) {
            throw new Error('Registro não encontrado');
          }
      
          return { message: 'Registro deletado com sucesso' };
        } catch (error) {
          throw error;
        }
      }
      
    }


module.exports = MovementProductService;
