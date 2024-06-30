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

  async create(userId, requisitionId, tipoPagamento) {
    const transaction = await this.sequelize.transaction();
    try {
      // Procurar requisição pelo Id
      const requisition = await this.Requisition.findOne({
        where: { id: requisitionId },
        transaction
      });

      console.log(requisition)

      if (!requisition) {
        throw new Error('NÃO EXISTE OU NÃO ENCONTRADA');
      }

      // Verificar se a requisição já foi concluída ou cancelada
      if (requisition.status === 'Concluida' || requisition.status === 'Rejeitada') {
        throw new Error('REQUISIÇÃO JÁ CONCLUÍDA OU CANCELADA');
      }

      // Variáveis para uso
      const { qtd_requerida, produto_requerido } = requisition;

      // Procurar produto pelo nome
      const produto = await this.Product.findOne({
        where: { nome: produto_requerido },
        transaction
      });

      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      // Buscar o estoque mais antigo do produto pelo critério FIFO
      const controleProduct = await this.ControleProduct.findOne({
        where: { productId: produto.id },
        order: [['dataEntrada', 'ASC']],
        transaction
      });

      if (!controleProduct || controleProduct.qtd_disponivel <= 0) {
        await this.updateRequisitionStatus(requisitionId, 'Rejeitada', transaction);
        throw new Error('Produto com estoque insuficiente! Requisição recusada.');
      }

      // Verificar se a quantidade disponível é suficiente
      if (controleProduct.qtd_disponivel < qtd_requerida) {
        await this.updateRequisitionStatus(requisitionId, 'Rejeitada', transaction);
        throw new Error('Quantidade disponível insuficiente');
      }

      // Atualizar ControleProduct com a nova quantidade disponível e quantidade bloqueada
      await this.ControleProduct.update(
        {
          qtd_disponivel: controleProduct.qtd_disponivel - qtd_requerida,
          qtd_bloqueado_venda: this.sequelize.literal(`qtd_bloqueado_venda + ${qtd_requerida}`)
        },
        { where: { id: controleProduct.id }, transaction }
      );

      // Criando venda
      const sell = await this.Sell.create({
        quantidade: qtd_requerida,
        dataVenda: dayjs().format('YYYY-MM-DD'),
        tipoPagamento,
        requisitionId,
        userId
      }, { transaction });

      // Procurar cliente pelo userId
      const cliente = await this.Cliente.findOne({
        where: { userId },
        transaction
      });

      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      const lucroVenda = controleProduct.preco_custo * 2; // Calculando o preço de venda com 100% de lucro

      // Criando Nota Fiscal
      const notaFiscal = await this.NotaFiscal.create({
        natureza_operacao: requisition.natureza_operacao,
        cnpj_cpf_comprador: cliente.CPF,
        nome_razao_comprador: cliente.nome,
        descricao_produto: produto_requerido,
        quantidade: qtd_requerida,
        cnpj_cpf_emitente: '123456/0001-10',
        nome_razao_emitente: 'JG Muambas',
        valor_nota: lucroVenda,
      }, { transaction });


     

      // Criando detalhes da venda
      const sellDetails = await this.SellDetails.create({
        quantidade: qtd_requerida,
        preco_venda: lucroVenda,
        productId: produto.id,
        sellId: sell.id,
        clienteId: cliente.id,
        notafiscalId: null // Atualizar após criação de NotaFiscal
      }, { transaction });


      // Atualiza o status da requisição
      await this.updateRequisitionStatus(requisitionId, 'Concluida', transaction);

      // Criando título
      const numeroParcela = parseInt(tipoPagamento.charAt(0), 10);
      const valorParcela = lucroVenda / numeroParcela;

      const title = await this.Title.create({
        qtd_Parcela: numeroParcela,
        valorOriginal: lucroVenda,
        status: 'aberto',
        notafiscalId: notaFiscal.id
      }, { transaction });

      let results = [];
      for (let i = 0; i < numeroParcela; i++) {
        const dataVencimentoParcela = dayjs().add(30 * (i + 1), 'day').format('YYYY-MM-DD');
        const novotitulo = await this.ControleTitle.create({
          tipoMovimento: 'abertura',
          valorMovimento: valorParcela,
          valorParcial: 0,
          dataVencimento: dataVencimentoParcela,
          dataPagamento: null,
          valorMulta: 0,
          valorJuros: 0,
          titleId: title.id
        }, { transaction });
        results.push(novotitulo);
      }

      await transaction.commit();
      return { sell, sellDetails, notaFiscal, controleTitles: results };

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar e atualizar dados:', error);
      throw error;
    }
  }

  async updateRequisitionStatus(requisitionId, status, transaction) {
    await this.Requisition.update(
      { status },
      { where: { id: requisitionId }, transaction }
    );
  }
}

module.exports = SellProcessingService;
