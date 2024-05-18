// ./services/quotationService.js
class QuotationService {
  constructor(QuotationModel) {
      this.Quotation = QuotationModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(description, status, supplierId) {
      try {
          const newQuotation = await this.Quotation.create({ description, status, supplierId });
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
}

module.exports = QuotationService;
