const dayjs = require('dayjs');
const { Op } = require('sequelize');

class TitlePayService {
  constructor(TitleModel, ControleTitleModel, NotaFiscalModel, sequelize) {
    this.title = TitleModel;
    this.controleTitle = ControleTitleModel;
    this.notaFiscal = NotaFiscalModel;
    this.sequelize = sequelize;
  }

  //--------------------------------------------------------------------------------------------------------//
  async cancelarTitulo(titleId) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.title.update(
        { status: 'cancelado' },
        { where: { id: titleId }, transaction }
      );

      await this.controleTitle.update(
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

  //--------------------------------------------------------------------------------------------------------//

  async pagarIntegral(cpf_cnpj, valor) {
    const transaction = await this.sequelize.transaction();
  
    if (valor <= 0) {
      throw new Error('O valor pago deve ser positivo.');
    }
  
    try {
      const comprador = await this.notaFiscal.findOne({
        where: { cnpj_cpf_comprador: cpf_cnpj },
        transaction
      });
  
      if (!comprador) {
        throw new Error('Comprador não encontrado.');
      }
  
      const titulo = await this.title.findOne({
        where: { notafiscalId: comprador.id },
        transaction
      });
  
      if (!titulo) {
        throw new Error('Título não encontrado.');
      }
  
      const parcela = await this.controleTitle.findOne({
        where: {
          titleId: titulo.id,
          tipoMovimento:'abertura',
          dataPagamento: null,
          dataVencimento: {[Op.lte]: dayjs().format('YYYY-MM-DD')}
        },
        order: [['dataVencimento', 'ASC']],
        transaction
      });
      
  
      if (!parcela) {
        throw new Error('Não há parcelas vencendo atualmente.');
      }
      
      // Convertendo valorMovimento para número
      const valorMovimento = parseFloat(parcela.valorMovimento);
      const valor1 = parseFloat(valor);


      let updateResult;
      if (valorMovimento === valor1) {
        updateResult = await this.controleTitle.update(
          { tipoMovimento: 'pagamento',
            valorParcial: 0, 
            dataPagamento: dayjs().format('YYYY-MM-DD') 
          },
          { where: { id: parcela.id }, transaction }
        );
      } else if (valorMovimento < valor1) {
        updateResult = await this.controleTitle.update(
          { valorParcial: valor1, 
            dataPagamento: dayjs().format('YYYY-MM-DD') 
          },
          { where: { id: parcela.id }, transaction }
        );
      }
  
      console.log("Resultado da atualização:", updateResult);
  
      if (!updateResult || updateResult[0] === 0) {
        new Error('Falha ao atualizar a parcela.');
      }
  
      const parcelasAbertas = await this.controleTitle.count({
        where: { titleId: titulo.id, tipoMovimento: 'abertura' },
        transaction
      });
  
      console.log("Contagem de parcelas abertas:", parcelasAbertas);
  
      if (parcelasAbertas === 0) {
        await this.title.update(
          { status: 'quitado' },
          { where: { id: titulo.id }, transaction }
        );
        return { message: 'Divida quitada.' };
      }
  
      await transaction.commit();
  
      return { message: 'Parcela paga com sucesso.' };
      
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao pagar parcela:', error);
      throw error;
    }
  }
  //--------------------------------------------------------------------------------------------------------//
  
  async pagarParcial(cpf_cnpj, valor) {
    const transaction = await this.sequelize.transaction();
  
    if (valor <= 0) {
      throw new Error('O valor pago deve ser positivo.');
    }
  
    try {
      const comprador = await this.notaFiscal.findOne({
        where: { cnpj_cpf_comprador: cpf_cnpj },
        transaction
      });
  
      if (!comprador) {
        throw new Error('Comprador não encontrado.');
      }
  
      const titulo = await this.title.findOne({
        where: { notafiscalId: comprador.id },
        transaction
      });
  
      if (!titulo) {
        throw new Error('Título não encontrado.');
      }
  
      const parcela = await this.controleTitle.findOne({
        where: {
          titleId: titulo.id,
          tipoMovimento: 'abertura',
          valorParcial: { [Op.lt]: this.sequelize.col('valorMovimento') }, // Verifica se o valorParcial é menor que valorMovimento
        },
        order: [['dataVencimento', 'ASC']],
        transaction
      });
  
      if (!parcela) {
        throw new Error('Parcela não encontrada.');
      }
  
      console.log('Dados da parcela:', parcela);
  
      // Convertendo valores para números
      const valorMovimento = parseFloat(parcela.valorMovimento);
      const valorParcial = parseFloat(parcela.valorParcial);
      const valorMulta = parseFloat(parcela.valorMulta);
      const valor1 = parseFloat(valor);
  
      console.log(valorMovimento);
      console.log(valorMulta);
      console.log(valorParcial);
      console.log(valor1);
  
      // Verificar se o valor pago mais a multa não excede o valor total da parcela
      if (valor1 > valorMulta && valorMulta > 0) {
        throw new Error('Pagamento não autorizado! Pagamento maior que a dívida pendente.');
      }
  
      let updateResult;
  
      if (valor1 === valorMulta) {
        updateResult = await this.controleTitle.update(
          {
            tipoMovimento: 'pagamento',
            valorParcial: 0,
            dataPagamento: dayjs().format('YYYY-MM-DD'),
            valorMulta: 0
          },
          { where: { id: parcela.id }, transaction }
        );
  
        if (!updateResult || updateResult[0] === 0) {
          throw new Error('Falha ao atualizar a parcela.');
        }
  
        // Verificar se todas as parcelas foram pagas
        const parcelasAbertas = await this.controleTitle.count({
          where: { titleId: titulo.id, tipoMovimento: 'abertura' },
          transaction
        });
  
        if (parcelasAbertas === 0) {
          await this.title.update(
            { status: 'quitado' },
            { where: { id: titulo.id }, transaction }
          );
          await transaction.commit(); // Commit da transação aqui
          return { message: 'Dívida quitada.' };
        }
  
        await transaction.commit(); // Commit da transação aqui
  
        return { message: 'Você quitou esta parcela.' };
  
      } else if (valor1 < valorMovimento) {
        updateResult = await this.controleTitle.update(
          {
            valorParcial: valor,
            dataPagamento: dayjs().format('YYYY-MM-DD'),
            valorMulta: valorMovimento - valor1
          },
          { where: { id: parcela.id }, transaction }
        );
  
        if (!updateResult || updateResult[0] === 0) {
          throw new Error('Falha ao atualizar a parcela.');
        }
  
        // Verificar se todas as parcelas foram pagas
        const parcelasAbertas = await this.controleTitle.count({
          where: { titleId: titulo.id, tipoMovimento: 'abertura' },
          transaction
        });
  
        if (parcelasAbertas === 0) {
          await this.title.update(
            { status: 'quitado' },
            { where: { id: titulo.id }, transaction }
          );
          await transaction.commit(); // Commit da transação aqui
          return { message: 'Dívida quitada.' };
        }
  
        await transaction.commit(); // Commit da transação aqui
  
        return { message: 'Você quitou parte desta parcela.' };
  
      } else {
        return { message: 'Valor pago não pode ser maior do que a dívida pendente nesta parcela.' };
      }
  
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao pagar parcela:', error);
      throw error;
    }
  }
  
  
  
  
  //--------------------------------------------------------------------------------------------------------//
  
}

module.exports = TitlePayService;
