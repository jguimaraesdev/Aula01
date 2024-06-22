// ./controllers/PurchaseController.js

class PurchaseController {
    
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
        const {dataCompra, quantidade, custototal, tipoPagamento, supplierId, quotationId} = req.body;
        const Id = req.userId; 
        try {
            const result = await this.purchaseService.create(dataCompra, quantidade, custototal, tipoPagamento, supplierId, quotationId, Id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir a novo registro" });
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
  
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
  
            const { updatedRowsCount, updatedRows } = await this.purchaseService.update(Id, updates);
  
            if (updatedRowsCount > 0) {
                return res.status(200).json({ message: "Registro atualizado com sucesso" });
            } else {
                res.status(404).json({ error: "Registro não encontrada", updatedRowsCount, updatedRows });
            }
        } catch (error) {
            console.error("Erro ao atualizar registro:", error);
            return res.status(500).json({ error: "Erro ao atualizar registro" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findAll(req, res) {
        const { page, pageSize } = req.query;
        try {
            const result = await this.purchaseService.findAll(page, pageSize);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar registros" });
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
        const Id = req.params.id;
        try {
            const result = await this.purchaseService.findById(Id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "Registro não encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
  
  
    //--------------------------------------------------------------------------------------------------//
  
    async delete (req, res){
        const Id = req.params.id;
    
        const result = await this.purchaseService.delete(Id);
              if (result) {
                  res.status(200).json(result);
              } else {
                  res.status(404).json({ error: "Registro não deletado" });
              }
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
   
  
    //--------------------------------------------------------------------------------------------------//
    
    async getPurchasesBySupplier(req, res) {
        const supplierId = req.params.supplierId;
        try {
            const purchases = await this.purchaseService.getPurchasesBySupplier(supplierId);
            res.status(200).json(purchases);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar compras por fornecedor" });
        }
    }
  
     //--------------------------------------------------------------------------------------------------//

}
  module.exports = PurchaseController;