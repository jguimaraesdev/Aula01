// ./services/purchaseService.js
const dayjs = require('dayjs'); //npm install dayjs

class PurchaseService {
    constructor(PurchaseModel) {

        this.Purchase = PurchaseModel;
        
    }   
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(quantidade, custototal, tipoPagamento, supplierId, quotationId, userId) {

        try {
            
            const result = await this.Purchase.create(
                { quantidade, 
                    custototal, 
                    tipoPagamento, 
                    supplierId, 
                    quotationId, 
                    userId 
                }
            );
    
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(id, updates) {
        try {
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
  
            const [updatedRowsCount, updatedRows] = await this.Purchase.update(updates, {
                where: { id },
            });
  
            if (updatedRowsCount === 0) {
                throw new Error("Nenhum registro encontrado para atualização");
            } else {
                return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
            }
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const result = await this.Purchase.findAndCountAll({
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
            const result = await this.Purchase.findOne({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id) {
        try {
          const result = await this.Purchase.destroy({
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
    
    async getPurchasesBySupplier(supplierId) {
        try {
            const purchases = await this.Purchase.findAll({ where: { supplierId } });
            return purchases;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  

  
  }
  
  module.exports = PurchaseService;