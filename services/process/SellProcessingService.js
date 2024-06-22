// service/process/SellProcessingService.js

const dayjs = require('dayjs'); // npm install dayjs

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

  async create({ produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, tipoPagamento}) {
    const transaction = await this.sequelize.transaction();
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

      // Criando requisição
      const requisition = await this.Requisition.create({
        produto_requerido,
        qtd_requerida,
        categoria,
        natureza_operacao,
        userId,
        costCenterId
      }, { transaction });

      // Procurar no ControleProduct se tem qtd_disponivel
      const controleProduct = await this.ControleProduct.findOne({
        where: { productId },
        transaction
      });

      if (!controleProduct || controleProduct.qtd_disponivel < qtd_requerida) {
        throw new Error('Quantidade disponível insuficiente');
      }

      // Atualizando ControleProduct
      await this.ControleProduct.update(
        {
          qtd_disponivel: controleProduct.qtd_disponivel - qtd_requerida,
          qtd_bloqueado: qtd_requerida
        },
        {
          where: { id: controleProduct.id },
          transaction
        }
      );

      // Gerar dataVenda
      const dataatual = dayjs().format('YYYY-MM-DD');

      // Criando venda
      const sell = await this.Sell.create({
        quantidade : qtd_requerida,
        dataVenda: dataatual, // Atualizar conforme necessidade
        tipoPagamento,
        requisitionId: requisition.id,
        userId
      }, { transaction });


      // Procurar no ControleProduct se tem qtd_disponivel
      const cliente = await this.Cliente.findOne({
        where: { userId },
        transaction
      });

      const lucrovenda = produto.preco_custo * 2 ;// Calculando o preço de venda com 100% de lucro

      // Criando detalhes da venda
      const sellDetails = await this.SellDetails.create({
        quantidade: qtd_requerida,
        preco_venda: lucrovenda, 
        productId,
        sellId: sell.id,
        clienteId:cliente.id,
        notafiscalId: null // Atualizar após criação de NotaFiscal
      }, { transaction });

      // Criando Nota Fiscal
      const notaFiscal = await this.NotaFiscal.create({
        natureza_operacao,
        cnpj_cpf_comprador: cliente.CPF ,
        nome_razao_comprador: cliente.nome,
        descricao_produto: produto_requerido,
        quantidade: qtd_requerida,
        cnpj_cpf_emitente: '123456/0001-10',
        nome_razao_emitente: 'JG Muambas',
        valor_nota:  lucrovenda, 
      }, { transaction });

      // Atualizar sellDetails com notafiscalId
      await this.SellDetails.update(
        { notafiscalId: notaFiscal.id },
        { where: { id: sellDetails.id }, transaction }
      );

      // Criando título
      const numeroParcela = tipoPagamento === 'PARCELADO' ? 3 : 1;
      const valorParcela = lucrovenda  / numeroParcela;

      const title = await this.Title.create({
        qtd_parcela: numeroParcela,
        valorOriginal: produto.preco_custo,
        dataVencimento: dayjs().add(30, 'day').format('YYYY-MM-DD'),
        status: 'pendente',
        notafiscalId: notaFiscal.id
      }, { transaction });

      // Criando controle de título
      const controleTitlePromises = [];
      for (let i = 0; i < numeroParcela; i++) {
        controleTitlePromises.push(this.ControleTitle.create({
          tipoMovimento: 'abertura',
          valorMovimento: valorParcela,
          valorMulta: 0,
          valorJuros: 0,
          titleId: title.id
        }, { transaction }));
      }
      await Promise.all(controleTitlePromises);

      await transaction.commit();
      return { requisition, sell, sellDetails, notaFiscal, title };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao processar venda:', error);
      throw error;
    }
  }
}

module.exports = SellProcessingService;
