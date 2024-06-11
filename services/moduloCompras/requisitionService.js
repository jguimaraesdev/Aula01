// ./services/requisitionService.js
class RequisitionService {
  constructor(RequisitionModel) {
      this.Requisition = RequisitionModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(produto_requerido, qtd_requerida, status, userId, costCenterId) {
      try {
          const result = await this.Requisition.create({ produto_requerido, qtd_requerida, status, userId, costCenterId });
          return result;
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

          const [updatedRowsCount, updatedRows] = await this.Requisition.update(updates, {
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
          const result = await this.Requisition.findAndCountAll({
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
          const result = await this.Requisition.findOne({ where: { id } });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.Requisition.destroy({
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

  async getRequisitionByCostCenter(costcenterId, page = 1, pageSize = 10) {
      try {
        const offset = (page - 1) * pageSize;
          const posicao = await this.Requisition.findAndCountAll({
            where: { costCenterId: costcenterId },
            limit: pageSize,
            offset: offset
              
          });
          return posicao;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//



}

module.exports = RequisitionService;
