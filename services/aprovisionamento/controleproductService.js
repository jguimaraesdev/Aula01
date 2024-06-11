// ./services/movimentsProductService.js
class ControleProductService {
    constructor(ControleProductModel) {
        this.ControleProduct = ControleProductModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId) {
        try {
            const result = await this.ControleProduct.create({
                movimento_tipo,
                qtd_disponivel,
                qtd_bloqueado,
                valor_faturado,
                productId, 
                depositId
            });
            return result;
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
            const [updatedRowsCount, updatedRows] = await this.ControleProduct.update(updates, {
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

    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const result = await this.ControleProduct.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findById(id) {
        try {
            const result = await this.ControleProduct.findOne({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async delete(id) {
        try {
          const result = await this.ControleProduct.destroy({
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
      
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByDeposito(depositId, page = 1, pageSize = 10) {
        try {
          const offset = (page - 1) * pageSize;
          
          const posicao = await this.ControleProduct.findAndCountAll({
            where: { depositId: depositId },
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
            
            const posicao = await this.ControleProduct.findAndCountAll({
                where: { productId: produtoId, 
                         depositId: depositoId 
                },
                limit: pageSize,
                offset: offset
            });
            return posicao;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    
}

module.exports = ControleProductService;
