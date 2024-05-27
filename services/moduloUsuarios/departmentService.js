// ./services/departmentService.js

class DepartmentService {
  constructor(DepartmentModel) {
      this.Department = DepartmentModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(nome, userId) {
      try {
          const newDepartment = await this.Department.create({ nome, userId });
          return newDepartment;
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

          const [updatedRowsCount, updatedRows] = await this.Department.update(updates, {
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

  async findAllDepartments(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const departments = await this.Department.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return departments;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findDepartmentById(id) {
      try {
          const department = await this.Department.findOne({ where: { id } });
          return department;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id){
    return this.Department.delete({ where: { id }});
  }

}

module.exports = DepartmentService;
