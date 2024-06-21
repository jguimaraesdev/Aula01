//controllers/process/PurchaseProcessingController.js

class PurchaseProcessingController{
    constructor(PurchaseProcessingService){
        this.PurchaseProcessService = PurchaseProcessingService;
    }


    async create(req, res){
        const{quantidade, custototal, tipoPagamento, supplierId, quotationId, userId} = req.body;

        try{

            const result = await this.PurchaseProcessSercice.create({
                quantidade, 
                custototal, 
                tipoPagamento, 
                supplierId, 
                quotationId, 
                userId
            });
            res.status(200).json(result);

        } catch(error){

            res.status(500).json({ error: "Erro ao inserir novo Registro" });

        }
    }

}

module.exports = PurchaseProcessingController;