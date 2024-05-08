class XtelefoneController {
    
    constructor(xtelefoneService) {
        this.xtelefoneService = xtelefoneService;
    }

    //--------------------------------------------------------------------------------------------------//
    
    async create(req, res) {
        const { DDD, numero } = req.body;
        const userId = req.userId; // Suponho que você tenha o ID do usuário na requisição
        try {
            const newXtelefone = await this.xtelefoneService.create(DDD, numero, userId);
            res.status(200).json(newXtelefone);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir o novo telefone" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const xtelefoneId = req.params.id;
        const updates = req.body;
        try {
            const { updatedRowsCount, updatedRows } = await this.xtelefoneService.update(xtelefoneId, updates);
            if (updatedRowsCount > 0) {
                res.status(200).json(updatedRows);
            } else {
                res.status(404).json({ error: "Telefone não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar telefone" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllXtelefones(req, res) {
        try {
            const xtelefones = await this.xtelefoneService.findAllXtelefones();
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
}

module.exports = XtelefoneController;
