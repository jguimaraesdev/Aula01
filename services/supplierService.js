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
  
    async findAll(page, pageSize) {
      const offset = (page - 1) * pageSize;
      return this.Supplier.findAndCountAll({
        limit: pageSize,
        offset,
      });
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
  