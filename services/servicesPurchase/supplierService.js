// ./services/supplierService.js
class SupplierService {
    constructor(SupplierModel) {
      this.Supplier = SupplierModel;
    }
    
    //--------------------------------------------------------------------------------------------------//

    async create(data) {
      return this.Supplier.create(data);
    }
  
    async update(id, data) {
      return this.Supplier.update(data, { where: { id } });
    }
  
    async findAll() {
      return this.Supplier.findAll();
    }
  
    async findById(id) {
      return this.Supplier.findByPk(id);
    }
  
    async delete(id) {
      return this.Supplier.destroy({ where: { id } });
    }
  }

  //--------------------------------------------------------------------------------------------------//
  
  module.exports = SupplierService;
  