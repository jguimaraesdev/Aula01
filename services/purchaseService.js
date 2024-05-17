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
  
    async findAll(page, pageSize) {
      const offset = (page - 1) * pageSize;
      return this.Purchase.findAndCountAll({
        include: ['supplier', 'quotation', 'buyer', 'product'],
        limit: pageSize,
        offset,
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
  