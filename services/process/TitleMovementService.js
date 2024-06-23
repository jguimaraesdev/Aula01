// service/TitleMovementService.js

const dayjs = require('dayjs'); // npm install dayjs

class TitleMovementService {
  
  constructor(TitleModel, ControleTitleModel, sequelize) {
    this.Title = TitleModel;
    this.ControleTitle = ControleTitleModel;
    this.sequelize = sequelize;
  }

  //--------------------------------------------------------------------------------------------------//

  async cancelarTitulo(titleId) {
    const transaction = await this.sequelize.transaction();
    try {
      // Atualizar status do título para "cancelado"
      await this.Title.update(
        { status: 'cancelado' },
        { where: { id: titleId }, transaction }
      );

      // Atualizar todos os movimentos do título para "cancelado"
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


  //--------------------------------------------------------------------------------------------------//

  async pagarParcela(titleId) {
    const transaction = await this.sequelize.transaction();
    try {
      // Procurar parcela vencendo atualmente
      const parcela = await this.ControleTitle.findOne({
        where: { 
          titleId, 
          tipoMovimento: 'abertura',
          dataVencimento: {
            [this.sequelize.Op.lte]: dayjs().format('YYYY-MM-DD')
          }
        },
        order: [['dataVencimento', 'ASC']],
        transaction
      });

      if (!parcela) {
        throw new Error('Não há parcelas vencendo atualmente.');
      }

      // Atualizar parcela para "paga"
      await this.ControleTitle.update(
        { tipoMovimento: 'pagamento' },
        { where: { id: parcela.id }, transaction }
      );

      // Verificar se todas as parcelas foram pagas
      const parcelasAbertas = await this.ControleTitle.count({
        where: { titleId, tipoMovimento: 'abertura' },
        transaction
      });

      if (parcelasAbertas === 0) {
        // Atualizar status do título para "quitado"
        await this.Title.update(
          { status: 'quitado' },
          { where: { id: titleId }, transaction }
        );
      }

      await transaction.commit();
      return { message: 'Parcela paga com sucesso.' };
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao pagar parcela:', error);
      throw error;
    }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = TitleMovementService;
