const dayjs = require('dayjs');

class SellProcessingService {
  constructor(SellModel, RequisitionModel, ProductModel, ControleProductModel, TitleModel, ControleTitleModel, SellDetailsModel, NotaFiscalModel, ClienteModel, sequelize) {
    this.Sell = SellModel;
    this.Requisition = RequisitionModel;
    this.Product = ProductModel;
    this.ControleProduct = ControleProductModel;
    this.Title = TitleModel;
    this.ControleTitle = ControleTitleModel;
    this.SellDetails = SellDetailsModel;
    this.NotaFiscal = NotaFiscalModel;
    this.Cliente = ClienteModel;
    this.sequelize = sequelize;
  }

  async create(produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, tipoPagamento, transaction) {
    try {
      // Procurar produto pelo nome
      const produto = await this.Product.findOne({
        where: { nome: produto_requerido },
        transaction
      });

      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      const productId = produto.id;

      // Verificar se há estoque disponível
      const controleProduct = await this.ControleProduct.findOne({
        where: { produtoId: productId },
        transaction
      });

      if (!controleProduct || controleProduct.qtd_disponivel <= 0) {
        throw new Error('Produto com estoque insuficiente! Requisição recusada.');
      }

      // Criando requisição
      const requisition = await this.Requisition.create({
        produto_requerido,
        qtd_requerida,
        categoria,
        natureza_operacao,
        userId,
        costCenterId
      }, { transaction });

      if (!controleProduct || controleProduct.qtd_disponivel < qtd_requerida) {
        throw new Error('Quantidade disponível insuficiente');
      }

      // Atualizando ControleProduct
      await this.ControleProduct.update(
        {
          qtd_disponivel: controleProduct.qtd_disponivel - qtd_requerida,
          qtd_bloqueado: qtd_requerida
        },
        { where: { id: controleProduct.id }, transaction }
      );

      // Gerar dataVenda
      const dataatual = dayjs().format('YYYY-MM-DD');

      // Criando venda
      const sell = await this.Sell.create({
        quantidade: qtd_requerida,
        dataVenda: dataatual,
        tipoPagamento,
        requisitionId: requisition.id,
        userId
      }, { transaction });

      // Procurar no ControleProduct se tem qtd_disponivel
      const cliente = await this.Cliente.findOne({
        where: { userId },
        transaction
      });

      const lucrovenda = produto.preco_custo * 2; // Calculando o preço de venda com 100% de lucro

      // Criando detalhes da venda
      const sellDetails = await this.SellDetails.create({
        quantidade: qtd_requerida,
        preco_venda: lucrovenda,
        productId: productId,
        sellId: sell.id,
        clienteId: cliente.id,
        notafiscalId: null // Atualizar após criação de NotaFiscal
      }, { transaction });

      // Criando Nota Fiscal
      const notaFiscal = await this.NotaFiscal.create({
        natureza_operacao,
        cnpj_cpf_comprador: cliente.CPF,
        nome_razao_comprador: cliente.nome,
        descricao_produto: produto_requerido,
        quantidade: qtd_requerida,
        cnpj_cpf_emitente: '123456/0001-10',
        nome_razao_emitente: 'JG Muambas',
        valor_nota: lucrovenda,
      }, { transaction });

      // Atualizar sellDetails com notafiscalId
      await this.SellDetails.update(
        { notafiscalId: notaFiscal.id },
        { where: { id: sellDetails.id }, transaction }
      );

      // Criando título
      const firstLetter = tipoPagamento.charAt(0).toUpperCase();
      const numeroParcela = parseInt(firstLetter, 10); // 10 é a base decimal
      const valorParcela = lucrovenda / numeroParcela;

      const title = await this.Title.create({
        qtd_parcela: numeroParcela,
        valorOriginal: produto.preco_custo,
        status: 'aberto',
        notafiscalId: notaFiscal.id
      }, { transaction });

      let results = [];

      for (let i = 0; i < numeroParcela; i++) {
        const dataVencimentoParcela = dayjs().add(30 * (i + 1), 'day').format('YYYY-MM-DD');
        const novotitulo = await this.ControleTitle.create(
          {
            tipoMovimento: 'abertura',
            valorMovimento: valorParcela,
            dataVencimento: dataVencimentoParcela,
            valorMulta: 0,
            valorJuros: 0,
            titleId: title.id
          },
          { transaction }
        );
        console.log(`Created ControleTitle ${i + 1}: `, novotitulo);
        results.push(novotitulo);
      }

      await transaction.commit();

      return { requisition, sell, sellDetails, notaFiscal, controleTitles: results };

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao processar venda:', error);
      throw error;
    }
  }
}

module.exports = SellProcessingService;
