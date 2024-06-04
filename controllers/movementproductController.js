// ./controllers/MovimentsController.js
class MovementProductController {
    constructor(movementproductService) {
        this.movementproductService = movementproductService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId  } = req.body;
        try {
            const result = await this.movementproductService.create(movimento_tipo, qtd_disponivel, qtd_bloqueado, valor_faturado, productId, depositId );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir registro" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const Id = req.params.id;
        const updates = req.body;
        try {
            
            if (isNaN(Id)) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.movementproductService.update(Id, updates);
    
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
            const registro = await this.movementproductService.findAll(page, pageSize);
            res.status(200).json(registro);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registro' });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findById(req, res) {
        const Id = req.params.id;
        try {
            const result = await this.movementproductService.findById(Id);
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
    
        const result = await this.movementproductService.delete(Id);
              if (result) {
                  res.status(200).json(result);
              } else {
                  res.status(404).json({ error: "Registro não deletado" });
              }
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
    

    //--------------------------------------------------------------------------------------------------//
    
    async getPosicaoByDeposito(req, res) {
        const { depositoId: Id, page = 1, pageSize = 10 } = req.params;
        try {
            const posicao = await this.movementproductService.getPosicaoByDeposito(Id, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por depósito" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(req, res) {
        const { produtoId, depositoId, page = 1, pageSize = 10 } = req.params;
        try {
            const posicao = await this.movementproductService.getPosicaoByProdutoDeposito(produtoId, depositoId, page, pageSize);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por produto e depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

}

module.exports = MovementProductController;
