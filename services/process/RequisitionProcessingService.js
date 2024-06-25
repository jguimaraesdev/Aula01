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
      switch (natureza_operacao) {

        case 'Venda':
          
          try{

          const requisition = await this.Requisition.create({
              produto_requerido,
              categoria,
              natureza_operacao,
              qtd_requerida,
              status: 'Em Processamento',
              userId,
              costCenterId
            }, { transaction });

            return requisition;
          }catch (error) {
            await transaction.rollback();
            console.error('Erro ao criar e atualizar dados:', error);
            throw error;
          } 

        
        case 'Importação':
          // Abrir cotações para fornecedores da categoria
          const suppliers = await this.Supplier.findAll({
            where: { categoria, natureza_operacao },
            limit: 3,
            transaction
          });

          if (suppliers.length === 0) {
            throw new Error('Nenhum fornecedor encontrado para a categoria e natureza da operação especificadas');
          }

          const requisition = await this.Requisition.create({
            produto_requerido,
            categoria,
            natureza_operacao,
            qtd_requerida,
            status: 'Em Processamento',
            userId,
            costCenterId
          }, { transaction });

          const currentDate = new Date();
          // Calcular a data de validade adicionando 5 dias
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
}

module.exports = RequisitionProcessingService;
