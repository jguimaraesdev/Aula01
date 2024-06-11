// ./services/departmentService.js

class DepartmentService {
  constructor(DepartmentModel, CostCenterModel) {
      this.Department = DepartmentModel;
      this.CostCenter = CostCenterModel;
    
    
  }

  //--------------------------------------------------------------------------------------------------//

  async create(nome) {
    const transaction = await this.Department.sequelize.transaction();
    try {
        // Cria o departamento dentro da transação
        const department = await this.Department.create({ nome }, { transaction });
        console.log('Departamento criado:', department);

        // Extrai a primeira letra do nome
        const firstLetter = nome.charAt(0).toUpperCase();

        // Conta o número de centros de custo existentes
        const count = await this.CostCenter.count({ transaction });
        console.log('Número de centros de custo existentes:', count);

        // Gera o código do centro de custo
        const codigo = `CC${firstLetter}${(count + 1).toString().padStart(2, '0')}`;
        console.log('Código do centro de custo gerado:', codigo);

        // Cria o centro de custo associado dentro da transação
        const costCenter = await this.CostCenter.create({ codigo, departmentId: department.id }, { transaction });
        console.log('Centro de custo criado:', costCenter);

        await transaction.commit();
        return { department, costCenter };
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao criar departamento e centro de custo:', error);
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

  async findAll(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const result = await this.Department.findAndCountAll({
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
          const result = await this.Department.findOne({ where: { id } });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.Department.destroy({
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


}

module.exports = DepartmentService;
