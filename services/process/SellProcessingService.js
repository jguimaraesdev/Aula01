// service/process/SellProcessingService.js

const dayjs = require('dayjs'); // npm install dayjs

class SellProcessingService {
  constructor(sellService, requisitionService, productService, controleProductService, titleService, controleTitleService, sellDetailsService, notaFiscalService, sequelize) {
    this.sellService = sellService;
    this.requisitionService = requisitionService;
    this.productService = productService;
    this.controleProductService = controleProductService;
    this.titleService = titleService;
    this.controleTitleService = controleTitleService;
    this.sellDetailsService = sellDetailsService;
    this.notaFiscalService = notaFiscalService;
    this.sequelize = sequelize;
  }

  async create({ produto_requerido, qtd_requerida, categoria, natureza_operacao, userId, costCenterId, valor, tipoMovimento, tipoPagamento, clienteId }) {
    const transaction = await this.sequelize.transaction();
    try {
      //---------------------------------------------------------------------------------------//
      // Criando requisição
      const requisition = await this.requisitionService.create({
        produto_requerido, 
        qtd_requerida, 
        categoria, 
        natureza_operacao, 
        userId, 
        costCenterId 
      }, { transaction });

      // Procurar no ControleProduct se tem qtd_disponivel
      const controleProduct = await this.controleProductService.findOne({
        where: { productId: requisition.productId },
        transaction
      });

      if (!controleProduct || controleProduct.qtd_disponivel < qtd_requerida) {
        throw new Error('Quantidade disponível insuficiente');
      }

      // Atualizando ControleProduct
      await this.controleProductService.update(
        {
          qtd_disponivel: controleProduct.qtd_disponivel - qtd_requerida
        },
        {
          where: { id: controleProduct.id },
          transaction
        }
      );

      // Gerar dataVenda
      const dataVenda = dayjs().format('YYYY-MM-DD');

      // Criando venda
      const sell = await this.sellService.create({
        valor, 
        tipoMovimento,
        dataVenda, 
        dataVencimento: dataVenda, // Atualizar conforme necessidade
        tipoPagamento, 
        requisitionId: requisition.id,
        userId
      }, { transaction });

      // Criando detalhes da venda
      const sellDetails = await this.sellDetailsService.create({
        quantidade: qtd_requerida,
        preco_venda: valor / qtd_requerida,
        productId: requisition.productId,
        sellId: sell.id,
        clienteId,
        notafiscalId: null // Atualizar após criação de NotaFiscal
      }, { transaction });

      // Criando Nota Fiscal
      const notaFiscal = await this.notaFiscalService.create({
        natureza_operacao,
        cnpj_cpf_comprador: '123456/0001-10',
        nome_razao_comprador: 'JG Muambas',
        descricao_produto: produto_requerido,
        quantidade: qtd_requerida,
        cnpj_cpf_emitente: '987654/0001-10',
        nome_razao_emitente: 'Empresa X',
        valor_nota: valor
      }, { transaction });

      // Atualizar sellDetails com notafiscalId
      await this.sellDetailsService.update(
        { notafiscalId: notaFiscal.id },
        { where: { id: sellDetails.id }, transaction }
      );

      // Criando título
      const numeroParcela = tipoPagamento === 'PARCELADO' ? 3 : 1;
      const valorParcela = valor / numeroParcela;

      const title = await this.titleService.create({
        numeroParcela,
        valorParcela,
        dataVencimento: dayjs().add(30, 'day').format('YYYY-MM-DD'),
        status: 'pendente',
        notafiscalId: notaFiscal.id
      }, { transaction });

      // Criando controle de título
      const controleTitlePromises = [];
      for (let i = 0; i < numeroParcela; i++) {
        controleTitlePromises.push(this.controleTitleService.create({
          tipoMovimento,
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
