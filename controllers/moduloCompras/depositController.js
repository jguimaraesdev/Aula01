//./controllers/ CepositController.js
class DepositController {
    constructor(depositService) {
        this.depositService = depositService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { central } = req.body;
        try {
            const newDeposit = await this.depositService.create(central);
            res.status(200).json(newDeposit);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir o novo registro de depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async update(req, res) {
        const depositId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(depositId)) {
                return res.status(400).json({ error: "ID de depósito inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.depositService.update(depositId, updates);
    
            // Verificar se o depósito foi encontrado e atualizado com sucesso
            if (updatedRowsCount > 0) {
                return res.status(200).json({ message: "Depósito atualizado com sucesso"});
            } else {
               
                return res.status(404).json({ error: "Depósito não encontrado", updatedRowsCount, updatedRows });
            }
        } catch (error) {
            // Tratar erros gerais
            console.error("Erro ao atualizar depósito:", error);
            return res.status(500).json({ error: "Erro ao atualizar depósito" });
        }
    }
    

    //--------------------------------------------------------------------------------------------------//

    async findAllDeposits(req, res) {

        const { page, pageSize } = req.query;

        try {
            const deposits = await this.depositService.findAllDeposits(page, pageSize);
            res.status(200).json(deposits);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar registros de depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findDepositById(req, res) {
        const depositId = req.params.id;
        try {
            const deposit = await this.depositService.findDepositById(depositId);
            if (deposit) {
                res.status(200).json(deposit);
            } else {
                res.status(404).json({ error: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async delete (req, res){
        const depositId = req.params.id;
    
        const depositCenter = await this.depositService.delete(depositId);
              if (depositCenter) {
                  res.status(200).json(depositCenter);
              } else {
                  res.status(404).json({ error: "Registro não deletado" });
              }
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
    }

    //--------------------------------------------------------------------------------------------------//  



module.exports = DepositController;
