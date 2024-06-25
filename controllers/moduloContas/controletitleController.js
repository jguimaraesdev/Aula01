// ./controllers/ControleTitleController.js

class ControleTitleController {
    constructor(controletitleService) {
        this.controletitleService = controletitleService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const {tipoMovimento, valorMovimento, valorParcial, dataVencimento, dataPagamento, valorMulta, valorJuros, titleId } = req.body;
        
        try {
            const result = await this.controletitleService.create(
                tipoMovimento, 
                valorMovimento,
                valorParcial,
                dataVencimento,
                dataPagamento, 
                valorMulta, 
                valorJuros, 
                titleId
            );
            res.status(200).json(result);
        } catch(error){
            console.error('Erro no controlador ao criar:', error);
            res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const Id = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do depósito é um número válido
            if (isNaN(Id)) {
                return res.status(400).json({ error: "ID de movimento inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da DepositService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.controletitleService.update(Id, updates);
    
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
            const result = await this.controletitleService.findAll(page, pageSize);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findById(req, res) {
        const Id = req.params.id;
        try {
            const result = await this.controletitleService.findById(Id);
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
    
    async delete(req, res) {
        const Id = req.params.id;
    
        try {
            const result = await this.controletitleService.delete(Id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "Registro não deletado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    

    //--------------------------------------------------------------------------------------------------//

}

module.exports = ControleTitleController;
