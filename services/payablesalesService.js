

// ./services/salesService.js

class PayableSalesService {
  constructor(PayableSalesModel) {
      this.PayableSales = PayableSalesModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(valor, tipoMovimento, dataVencimento, tipoPagamento, notafiscalId) {
      try {
          const result = await this.PayableSales.create({ valor, tipoMovimento, dataVencimento, tipoPagamento, notafiscalId });
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

          const [updatedRowsCount, updatedRows] = await this.PayableSales.update(updates, {
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
          const result = await this.PayableSales.findAndCountAll({
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
          const result = await this.PayableSales.findOne({ where: { id } });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.PayableSales.destroy({
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

module.exports = PayableSalesService;
