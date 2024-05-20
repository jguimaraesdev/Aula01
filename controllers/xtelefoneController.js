// ./controllers/xtelefoneController.js
class XtelefoneController {
    
    constructor(xtelefoneService) {
        this.xtelefoneService = xtelefoneService;
    }

    //--------------------------------------------------------------------------------------------------//
    
    async create(req, res) {
        const { DDD, numero } = req.body;
        const UserId = req.userId; // Suponho que você tenha o ID do usuário na requisição
        try {
            const newXtelefone = await this.xtelefoneService.create(DDD, numero, UserId);
            res.status(200).json(newXtelefone);
            
        } catch (error) {
            console.error(error); // Adiciona esta linha para ver o erro no console
            res.status(500).json({ error: "Erro ao inserir o novo telefone" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const xtelefoneId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do registro é um número válido
            if (isNaN(xtelefoneId)) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da xtelefoneService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.xtelefoneService.update(xtelefoneId, updates);
           
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

    async findAllXtelefones(req, res) {

        const{ page, pageSize} = req.query;

        try {
            const xtelefones = await this.xtelefoneService.findAllXtelefones(page, pageSize);
            res.status(200).json(xtelefones);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar telefones" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findXtelefoneById(req, res) {
        const xtelefoneId = req.params.id;
        try {
            const xtelefone = await this.xtelefoneService.findXtelefoneById(xtelefoneId);
            if (xtelefone) {
                res.status(200).json(xtelefone);
            } else {
                res.status(404).json({ error: "Telefone não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async delete (req, res){
        try{
            await this.xtelefoneService.delete(req.params.id);
            res.status(204).send();
    
        }catch(erro){
            res.status(400).json({ error: error.message});
        }
    }

    //--------------------------------------------------------------------------------------------------//
}

module.exports = XtelefoneController;
