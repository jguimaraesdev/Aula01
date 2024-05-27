//service/salesService.js

// ./services/xtelefoneService.js

class SalesService {
  constructor(SalesModel) {
      this.Sales = SalesModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(qtdVendida, custoUnitario, parcelas, numeroNotaFiscal, productId ) {
      try {
          const newSales = await this.Sales.create({ qtdVendida, custoUnitario, parcelas, numeroNotaFiscal, productId});
          return newSales;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//
  
  async update(id, updates) {
      try {
          // Verificar se o ID fornecido é válido
          if (!id) {
              throw new Error("ID inválido para atualização");
          }
  
          // Atualizar os registros na tabela
          const [updatedRowsCount, updatedRows] = await this.Sales.update(updates, {
              where: { id },
          });
          // Verificar se algum registro foi atualizado
          if (updatedRowsCount === 0) {
              throw new Error("Nenhum registro encontrado para atualização");
          } else {
              // Retornar algo específico para indicar que a atualização foi bem-sucedida
              return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
          }
      } catch (error) {
          // Lançar novamente o erro para ser tratado na camada de controle
          throw error;
      }
          
  }


  //--------------------------------------------------------------------------------------------------//

  async findAllSales(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
      
          const allSales = await this.Sales.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return allSales;
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
  
  async delete(id){
      return this.Sales.delete({ where: { id }});
  }

}

module.exports = SalesService;
