

// ./services/salesService.js

class SalesService {
  constructor(SalesModel) {
      this.Sales = SalesModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(qtdVendida, custoUnitario, parcelas, numeroNotaFiscal) {
      try {
          const newSales = await this.Sales.create({ qtdVendida, custoUnitario, parcelas, numeroNotaFiscal });
          return newSales;
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

          const [updatedRowsCount, updatedRows] = await this.Sales.update(updates, {
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

  async findAllSales(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const sales = await this.Sales.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return sales;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findSalesById(id) {
      try {
          const sales = await this.Sales.findOne({ where: { id } });
          return sales;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.Sales.destroy({
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

module.exports = SalesService;
