// ./services/departmentService.js
class DepartmentService {
    constructor(DepartmentModel) {
      this.Department = DepartmentModel;
    }
    
    //--------------------------------------------------------------------------------------------------//

    async create(data) {
      return this.Department.create(data);
    }
  
    async update(id, data) {
      return this.Department.update(data, { where: { id } });
    }
  
    async findAll(page, pageSize) {
      const offset = (page - 1) * pageSize;
      return this.Department.findAndCountAll({
        limit: pageSize,
        offset,
      });
    }
  
    async findById(id) {
      return this.Department.findByPk(id);
    }
  
    async delete(id) {
      return this.Department.destroy({ where: { id } });
    }

    //--------------------------------------------------------------------------------------------------//
    
  }
  
  module.exports = DepartmentService;
  