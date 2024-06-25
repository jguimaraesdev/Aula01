const dayjs = require('dayjs'); // npm install dayjs

class PurchaseProcessingService {
  constructor(
    PurchaseModel,
    RequisitionModel,
    ProductModel,
    ControleProductModel,
    TitleModel,
    ControleTitleModel,
    QuotationModel,
    SupplierModel,
    NotaFiscalModel,
    sequelize
  ) {
    this.Purchase = PurchaseModel;
    this.Requisition = RequisitionModel;
    this.Product = ProductModel;
    this.ControleProduct = ControleProductModel;
    this.Title = TitleModel;
    this.ControleTitle = ControleTitleModel;
    this.Quotation = QuotationModel;
    this.Supplier = SupplierModel;
    this.NotaFiscal = NotaFiscalModel;
    this.sequelize = sequelize;
  }

  async create(tipoPagamento, quotationId, userId) {
    const transaction = await this.sequelize.transaction();
    try {
      // Procura cotação para pegar id da requisição
      const data = await this.Quotation.findByPk(quotationId, { transaction });

      if (!data) {
        throw new Error('Cotação não encontrada');
      }

      // Recebe dados da requisição para criação de produto
      const requisition = await this.Requisition.findByPk(data.requisitionId, { transaction });

      if (!requisition) {
        throw new Error('Requisição não encontrada');
      }
      if (requisition.status === 'Concluida') {
        throw new Error('Requisição com status Concluida, favor usar outra requisição');
      }

      const quantidade = requisition.qtd_requerida;
      const custototal = data.preco * quantidade;

      // Insere dados na tabela purchase
      const purchase = await this.Purchase.create(
        {
          dataCompra: dayjs().format('YYYY-MM-DD'),
          quantidade,
          custototal,
          tipoPagamento,
          quotationId,
          userId
        },
        { transaction }
      );

      const status = 'Concluida';

      // Atualiza o status da requisição
      await this.Requisition.update(
        { status },
        { where: { id: data.requisitionId }, transaction }
      );

      // Verificar se o produto já existe
      const existingProduct = await this.Product.findOne({
        where: { nome: requisition.produto_requerido },
        transaction
      });

      let product, controleProduct;

      if (!existingProduct){
        // Criando produto
        product = await this.Product.create(
          {
            nome: requisition.produto_requerido,
            status: 'ATIVO',
            supplierId: data.supplierId
          },
          { transaction }
        );

        // Criando um controle de produto
        controleProduct = await this.ControleProduct.create(
          {
            movimento_tipo: 'Disponivel',
            qtd_disponivel: quantidade,
            preco_custo: data.preco / quantidade,
            qtd_bloqueado: 0,
            valor_faturado: 0,
            productId: product.id,
            depositId: 1
          },
          { transaction }
        );
      }

      // Definindo quantas parcelas o title vai receber
      const firstLetter = tipoPagamento.charAt(0).toUpperCase();
      const parcela = parseInt(firstLetter, 10);

      // Criando um novo título de dívida
      const title = await this.Title.create(
        {
          qtd_Parcela: parcela,
          valorOriginal: custototal,
          status: 'aberto'
        },
        { transaction }
      );

      // Procura fornecedor para pegar dados necessários
      const supplier = await this.Supplier.findByPk(data.supplierId, { transaction });

      if (!supplier) {
        throw new Error('Supplier não encontrado');
      }

      // Cria nota fiscal
      const notaFiscal = await this.NotaFiscal.create(
        {
          natureza_operacao: supplier.natureza_operacao,
          cnpj_cpf_comprador: '123456/0001-10',
          nome_razao_comprador: 'JG Muambas',
          descricao_produto: requisition.produto_requerido,
          quantidade,
          cnpj_cpf_emitente: supplier.cnpj,
          nome_razao_emitente: supplier.nome,
          valor_nota: custototal
        },
        { transaction }
      );

      // Inserindo id de nota fiscal na compra por update
      await this.Purchase.update(
        { notafiscalId: notaFiscal.id },
        { where: { id: purchase.id }, transaction }
      );

      // Inserindo id de nota fiscal no título por update
      await this.Title.update(
        { notafiscalId: notaFiscal.id },
        { where: { id: title.id }, transaction }
      );

      // Controle de Títulos para Parcelamento
      let controleTitles = [];

      for (let i = 0; i < parcela; i++) {
        const dataVencimentoParcela = dayjs()
          .add(30 * (i + 1), 'day')
          .format('YYYY-MM-DD');

        const novoTitulo = await this.ControleTitle.create(
          {
            tipoMovimento: 'abertura',
            valorMovimento: custototal / parcela,
            dataVencimento: dataVencimentoParcela,
            valorMulta: 0,
            valorJuros: 0,
            titleId: title.id
          },
          { transaction }
        );
        console.log(`Created ControleTitle ${i + 1}: `, novoTitulo);
        controleTitles.push(novoTitulo);
      }

      await transaction.commit();

      // Retornando todas as transações
      return { purchase, data, requisition, product, controleProduct, title, notaFiscal, controleTitles };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar e atualizar dados:', error);
      throw error;
    }
  }
}

module.exports = PurchaseProcessingService;
