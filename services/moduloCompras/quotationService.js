// ./services/quotationService.js
class QuotationService {
  constructor(QuotationModel) {
      this.Quotation = QuotationModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(preco, supplierId, requisitionId) {
    try {
        // Obter a data e hora atuais
        const currentDate = new Date();
        
        // Calcular a data de validade adicionando 5 dias
        const validadeCotacao = new Date(currentDate);
        validadeCotacao.setDate(currentDate.getDate() + 5);

        // Criar o novo registro de cotação com as datas calculadas
        const result = await this.Quotation.create({
            preco,
            cotacaoData: currentDate,
            validadeCotacao,
            supplierId,
            requisitionId
        });

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

  async findAll(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const result = await this.Quotation.findAndCountAll({
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
          const result = await this.Quotation.findOne({ where: { id } });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//
  
  async delete(id) {
    try {
      const result = await this.Quotation.destroy({
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
