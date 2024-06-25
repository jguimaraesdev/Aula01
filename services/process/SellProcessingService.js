const dayjs = require('dayjs');

class SellProcessingService {
  constructor(SellModel, RequisitionModel, ProductModel, ControleProductModel, TitleModel, ControleTitleModel, SellDetailsModel, NotaFiscalModel, ClienteModel, sequelize) {
    this.Sell = SellModel;
    this.Requisition = RequisitionModel;
    this.Product = ProductModel; // Verifique se ProductModel está sendo passado corretamente
    this.ControleProduct = ControleProductModel;
    this.Title = TitleModel;
    this.ControleTitle = ControleTitleModel;
    this.SellDetails = SellDetailsModel;
    this.NotaFiscal = NotaFiscalModel;
    this.Cliente = ClienteModel;
    this.sequelize = sequelize;
  }

  async create(produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, tipoPagamento) {
    const transaction = await this.sequelize.transaction();
    try {
    

      // Criando requisição
      const requisition = await this.Requisition.create({
        produto_requerido,
        categoria,
        natureza_operacao,
        qtd_requerida,
        status: 'Em Processamento',
        userId,
        costCenterId
      }, { transaction });

      // Procurar cliente pelo userId
      const produto = await this.Product.findOne({
        where: { nome: requisition.produto_requerido },
        transaction
      });

      // Buscar o estoque mais antigo do produto pelo critério FIFO
      const controleProduct = await this.ControleProduct.findOne({
        where: { productId: produto.id },
        order: [['dataEntrada', 'ASC']], // Ordenar por dataEntrada ascendente para FIFO
        transaction
      });

      if (!controleProduct || controleProduct.qtd_disponivel <= 0) {
        throw new Error('Produto com estoque insuficiente! Requisição recusada.');
      }

      // Verificar se a quantidade disponível é suficiente
      if (controleProduct.qtd_disponivel < qtd_requerida) {
        throw new Error('Quantidade disponível insuficiente');
      }

      // Atualizar ControleProduct com a nova quantidade disponível e quantidade bloqueada
      await this.ControleProduct.update(
        {
          qtd_disponivel: controleProduct.qtd_disponivel - qtd_requerida,
          qtd_bloqueado: this.sequelize.literal(`qtd_bloqueado + ${qtd_requerida}`)
        },
        { where: { id: controleProduct.id }, transaction }
      );


      // Criando venda
      const sell = await this.Sell.create({
        quantidade: qtd_requerida,
        dataVenda:dayjs().format('YYYY-MM-DD'),
        tipoPagamento,
        requisitionId: requisition.id,
        userId
      }, { transaction });

      // Procurar cliente pelo userId
      const cliente = await this.Cliente.findOne({
        where: { userId : userId },
        transaction
      });

      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      const lucrovenda = controleProduct.preco_custo * 2; // Calculando o preço de venda com 100% de lucro

      // Criando detalhes da venda
      const sellDetails = await this.SellDetails.create({
        quantidade: qtd_requerida,
        preco_venda: lucrovenda,
        productId: produto.id,
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
        { where: { sellId: sell.id }, transaction }
      );

      // Criando título
       // Definindo quantas parcelas o título vai receber
       const firstLetter = tipoPagamento.charAt(0).toUpperCase();
       const numeroParcela = parseInt(firstLetter, 10);

       const valorParcela = lucrovenda / numeroParcela;

      // Criando um novo título de dívida
      const title = await this.Title.create(
        {
          qtd_Parcela: numeroParcela,
          valorOriginal: lucrovenda,
          status: 'aberto'
        },
        { transaction }
      );

      let results = [];

      for (let i = 0; i < numeroParcela; i++) {
        const dataVencimentoParcela = dayjs().add(30 * (i + 1), 'day').format('YYYY-MM-DD');
        const novotitulo = await this.ControleTitle.create(
          {
            tipoMovimento: 'abertura',
            valorMovimento: valorParcela,
            valorParcial: 0,
            dataVencimento: dataVencimentoParcela,
            dataPagamento: null,
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
      console.error('Erro ao criar e atualizar dados:', error);
      throw error;
    } 
  }
}

module.exports = SellProcessingService;
