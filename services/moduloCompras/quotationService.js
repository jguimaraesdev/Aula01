// ./services/quotationService.js
class QuotationService {
  constructor(QuotationModel) {
      this.Quotation = QuotationModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(preco, productId, supplierId, requisitionId) {
    try {
        // Obter a data e hora atuais
        const currentDate = new Date();
        
        // Calcular a data de validade adicionando 5 dias
        const validityDate = new Date(currentDate);
        validityDate.setDate(currentDate.getDate() + 5);

        // Criar o novo registro de cotação com as datas calculadas
        const newQuotation = await this.Quotation.create({
            price: preco,
            quotationDate: currentDate,
            validityDate,
            productId,
            supplierId,
            requisitionId
        });

        return newQuotation;
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

          const [updatedRowsCount, updatedRows] = await this.Quotation.update(updates, {
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

  async findAllQuotations(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const quotations = await this.Quotation.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return quotations;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findQuotationById(id) {
      try {
          const quotation = await this.Quotation.findOne({ where: { id } });
          return quotation;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getQuotationsBySupplier(supplierId) {
      try {
          const quotations = await this.Quotation.findAll({ where: { supplierId } });
          return quotations;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id){
    return this.Quotation.delete({ where: { id }});
  }

}

module.exports = QuotationService;
