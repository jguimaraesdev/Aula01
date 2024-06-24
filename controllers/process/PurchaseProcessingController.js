//controllers/process/PurchaseProcessingController.js


class PurchaseProcessingController {
    constructor(PurchaseProcessingService) {
        this.PurchaseProcessingService = PurchaseProcessingService;
    }

    async create(req, res) {
        const { tipoPagamento, quotationId} = req.body;
        const userId = req.userId;

        try {
            console.log('Iniciando criação de PurchaseProcessing');
            const result = await this.PurchaseProcessingService.create( 
                tipoPagamento,  
                quotationId, 
                userId,
            );
            res.status(200).json(result);
        } catch(error){
            console.error('Erro no controlador ao criar:', error);
            res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
        }
    }
}

module.exports = PurchaseProcessingController;
