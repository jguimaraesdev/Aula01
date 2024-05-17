// ./services/costCenterService.js
class CostCenterService {
    constructor(CostCenterModel) {
      this.CostCenter = CostCenterModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(data) {
      return this.CostCenter.create(data);
    }
  
    async update(id, data) {
      return this.CostCenter.update(data, { where: { id } });
    }
  
    async findAll() {
      return this.CostCenter.findAll();
    }
  
    async findById(id) {
      return this.CostCenter.findByPk(id);
    }
  
    async delete(id) {
      return this.CostCenter.destroy({ where: { id } });
    }
  }
  
  //--------------------------------------------------------------------------------------------------//
  
  module.exports = CostCenterService;
  