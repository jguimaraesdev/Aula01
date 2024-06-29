const dayjs = require('dayjs'); // npm install dayjs
const { Op } = require('sequelize'); // Importando Op do Sequelize

class TitlePayService {
  constructor(TitleModel, ControleTitleModel, NotaFiscalModel, sequelize) {
    
    this.Title = TitleModel;
    this.ControleTitle = ControleTitleModel;
    this.NotaFiscal = NotaFiscalModel;
    this.sequelize = sequelize;
  }

  //----------------------------------------------------------------------------------------------------------//

  async cancelarTitulo(titleId) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.Title.update(
        { status: 'cancelado' },
        { where: { id: titleId }, transaction }
      );

      await this.ControleTitle.update(
        { tipoMovimento: 'cancelamento' },
        { where: { titleId }, transaction }
      );

      await transaction.commit();
      return { message: 'Título cancelado com sucesso.' };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao cancelar título:', error);
      throw error;
    }
  }

  //----------------------------------------------------------------------------------------------------------//

  async pagarParcela(cpf_cnpj, valor) {
    const transaction = await this.sequelize.transaction();

    if (valor <= 0) {
      throw new Error('O valor pago deve ser positivo.');
    }

    try {
      const comprador = await this.NotaFiscal.findOne({
        where: { cnpj_cpf_comprador: cpf_cnpj },
        transaction
      });

      if (!comprador) {
        throw new Error('Comprador não encontrado.');
      }

      const titulo = await this.Title.findOne({
        where: { notafiscalId: comprador.id },
        transaction
      });

      if (!titulo) {
        throw new Error('Título não encontrado.');
      }

      const parcela = await this.ControleTitle.findOne({
        where: { 
          titleId: titulo.id, 
          dataPagamento: null,
          dataVencimento: {
            [Op.lte]: dayjs().format('YYYY-MM-DD')
          }
        },
        order: [['dataVencimento', 'ASC']],
        transaction
      });

      if (!parcela) {
        throw new Error('Não há parcelas vencendo atualmente.');
      }

      console.log("dados:", parcela);

      if (parcela.valorMovimento === valor) {
        await this.ControleTitle.update(
          { tipoMovimento: 'pagamento', 
            dataPagamento: dayjs().format('YYYY-MM-DD') 
          },
          { where: { id: parcela.id }, transaction }
        );
      } else if (parcela.valorMovimento < valor) {
        await this.ControleTitle.update(
          { valorParcial: valor, 
            dataPagamento: dayjs().format('YYYY-MM-DD') 
          },
          { where: { id: parcela.id }, transaction }
        );
      }

      const parcelasAbertas = await this.ControleTitle.count({
        where: { titleId: titulo.id, tipoMovimento: 'abertura' },
        transaction
      });

      if (parcelasAbertas === 0) {
        await this.Title.update(
          { status: 'quitado' },
          { where: { id: parcela.titleId }, transaction }
        );
      }

      await transaction.commit();
      console.log('Transação concluída com sucesso.');
      return { message: 'Parcela paga com sucesso.' };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao pagar parcela:', error);
      throw error;
    }
  }
  //----------------------------------------------------------------------------------------------------------//


}

module.exports = TitlePayService;
