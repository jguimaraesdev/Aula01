class DepositController {
    constructor(depositService) {
        this.depositService = depositService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { movimento, productId, qtd } = req.body;
        try {
            const newDeposit = await this.depositService.create(movimento, productId, qtd);
            res.status(200).json(newDeposit);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir o novo registro de depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllDeposits(req, res) {
        try {
            const deposits = await this.depositService.findAllDeposits();
            res.status(200).json(deposits);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar registros de depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async findDepositById(req, res) {
        const depositId = req.params.id;
        try {
            const deposit = await this.depositService.findProductById(depositId);
            if (deposit) {
                res.status(200).json(deposit);
            } else {
                res.status(404).json({ error: "Deposito não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//
}

module.exports = DepositController;
