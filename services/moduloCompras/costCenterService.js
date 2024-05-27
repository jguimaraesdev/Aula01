// ./services/costCenterService.js

class CostCenterService {
  constructor(CostCenterModel) {
      this.CostCenter = CostCenterModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(codigo, nome) {
      try {
          const newCostCenter = await this.CostCenter.create({ codigo, nome });
          return newCostCenter;
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

          const [updatedRowsCount, updatedRows] = await this.CostCenter.update(updates, {
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

  async findAllCostCenters(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const costCenters = await this.CostCenter.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return costCenters;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findCostCenterById(id) {
      try {
          const costCenter = await this.CostCenter.findOne({ where: { id } });
          return costCenter;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.CostCenter.destroy({
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
  
}

module.exports = CostCenterService;
