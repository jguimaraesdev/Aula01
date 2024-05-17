// ./services/purchaseService.js
class PurchaseService {
    constructor(PurchaseModel) {
      this.Purchase = PurchaseModel;
    }
    
    //--------------------------------------------------------------------------------------------------//

    async create(data) {
      return this.Purchase.create(data);
    }
  
    async update(id, data) {
      return this.Purchase.update(data, { where: { id } });
    }
  
    async findAll() {
      return this.Purchase.findAll({
        include: ['supplier', 'quotation', 'buyer', 'product'],
      });
    }
  
    async findById(id) {
      return this.Purchase.findByPk(id, {
        include: ['supplier', 'quotation', 'buyer', 'product'],
      });
    }
  
    async delete(id) {
      return this.Purchase.destroy({ where: { id } });
    }
  }
  
  //--------------------------------------------------------------------------------------------------//
  
  module.exports = PurchaseService;
  