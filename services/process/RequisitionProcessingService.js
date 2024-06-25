class RequisitionProcessingService {
  constructor(RequisitionModel, ControleProductModel, QuotationModel, SupplierModel, ProductModel, sequelize) {
    this.Requisition = RequisitionModel;
    this.ControleProduct = ControleProductModel;
    this.Quotation = QuotationModel;
    this.Supplier = SupplierModel;
    this.Product = ProductModel;
    this.sequelize = sequelize;
  }

  async create(produto_requerido, categoria, natureza_operacao, qtd_requerida, userId, costCenterId) {
    const transaction = await this.sequelize.transaction();

    try {
      let requisition;

      switch (natureza_operacao) {
        case 'Venda':
          requisition = await this.createRequisition({
            produto_requerido,
            categoria,
            natureza_operacao,
            qtd_requerida,
            userId,
            costCenterId
          }, transaction);
          break;

        case 'Importação':
          requisition = await this.handleImportation({
            produto_requerido,
            categoria,
            natureza_operacao,
            qtd_requerida,
            userId,
            costCenterId
          }, transaction);
          break;

        default:
          throw new Error('Natureza da operação desconhecida');
      }

      await transaction.commit();
      return { message: 'Processamento concluído com sucesso' };

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao processar requisição:', error);
      throw error; // Propaga o erro para o chamador
    }
  }

  async createRequisition(data, transaction) {
    try {
      return await this.Requisition.create({
        produto_requerido: data.produto_requerido,
        categoria: data.categoria,
        natureza_operacao: data.natureza_operacao,
        qtd_requerida: data.qtd_requerida,
        status: 'Em Processamento',
        userId: data.userId,
        costCenterId: data.costCenterId
      }, { transaction });
    } catch (error) {
      console.error('Erro ao criar requisição:', error);
      throw error;
    }
  }

  async handleImportation(data, transaction) {
    try {
      const suppliers = await this.Supplier.findAll({
        where: { categoria: data.categoria, natureza_operacao: data.natureza_operacao },
        limit: 3,
        transaction
      });

      if (suppliers.length === 0) {
        throw new Error('Nenhum fornecedor encontrado para a categoria e natureza da operação especificadas');
      }

      const requisition = await this.createRequisition(data, transaction);

      const currentDate = new Date();
      const validadeCotacao = new Date(currentDate);
      validadeCotacao.setDate(currentDate.getDate() + 5);

      const quotationPromises = suppliers.map(supplier => {
        return this.Quotation.create({
          preco: 0, // Definir o preço inicial, pode ser atualizado posteriormente
          cotacaoData: currentDate,
          validadeCotacao,
          supplierId: supplier.id,
          requisitionId: requisition.id
        }, { transaction });
      });

      await Promise.all(quotationPromises);

      return requisition;
    } catch (error) {
      console.error('Erro ao processar importação:', error);
      throw error;
    }
  }
}

module.exports = RequisitionProcessingService;
