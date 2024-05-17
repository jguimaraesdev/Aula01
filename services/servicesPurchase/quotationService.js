// ./services/quotationService.js
class QuotationService {
    constructor(QuotationModel) {
      this.Quotation = QuotationModel;
    }
    
    //--------------------------------------------------------------------------------------------------//

    async create(data) {
      return this.Quotation.create(data);
    }
  
    async update(id, data) {
      return this.Quotation.update(data, { where: { id } });
    }
  
    async findAll() {
      return this.Quotation.findAll({
        include: ['product', 'supplier', 'buyer'],
      });
    }
  
    async findById(id) {
      return this.Quotation.findByPk(id, {
        include: ['product', 'supplier', 'buyer'],
      });
    }
  
    async delete(id) {
      return this.Quotation.destroy({ where: { id } });
    }
  }
  
  //--------------------------------------------------------------------------------------------------//

  
  module.exports = QuotationService;
  