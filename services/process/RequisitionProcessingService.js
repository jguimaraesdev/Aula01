// services/process/RequisitionProcessingService.js

const dayjs = require('dayjs'); // npm install dayjs

class RequisitionProcessingService {
  constructor(RequisitionModel, ControleProductModel, QuotationModel, SupplierModel, SellProcessingService, sequelize) {
    this.Requisition = RequisitionModel;
    this.ControleProduct = ControleProductModel;
    this.Quotation = QuotationModel;
    this.Supplier = SupplierModel;
    this.SellProcessing = SellProcessingService;
    this.sequelize = sequelize;
  }

  async create( produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, tipoPagamento ) {
    const transaction = await this.sequelize.transaction();
    try {
      // Criar a requisição
      const requisition = await this.Requisition.create({
        produto_requerido,
        qtd_requerida,
        categoria,
        natureza_operacao,
        userId,
        costCenterId
      }, { transaction });

      switch (natureza_operacao) {
        case 'Venda':
          // Disparar SellProcessingService
          await this.SellProcessing.create({
            produto_requerido,
            qtd_requerida,
            categoria,
            natureza_operacao,
            userId,
            costCenterId,
            tipoPagamento,
          }, transaction);
          break;

        case 'Importação':
          // Verificar o estoque
          const product = await this.ControleProduct.findOne({
            where: { produto_requerido },
            transaction
          });

          if (product && product.qtd_disponivel >= 10) {
            await transaction.commit();
            return { message: 'Estoque suficiente' };
          } else {
            // Abrir 3 cotações para fornecedores da categoria
            const suppliers = await this.Supplier.findAll({
              where: { categoria, natureza_operacao },
              limit: 3,
              transaction
            });

            const quotationPromises = suppliers.map(supplier => {
              return this.Quotation.create({
                preco: 0, // Definir o preço inicial, pode ser atualizado posteriormente
                supplierId: supplier.id,
                requisitionId: requisition.id
              }, { transaction });
            });

            await Promise.all(quotationPromises);
          }
          break;

        // Adicione outros casos conforme necessário
        default:
          throw new Error('Natureza da operação desconhecida');
      }

      await transaction.commit();
      return { message: 'Processamento concluído com sucesso' };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao processar requisição:', error);
      throw error;
    }
  }
}

module.exports = RequisitionProcessingService;
