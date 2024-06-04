//service/notafiscalService.js


class NotaFiscalService {
    constructor(NotaFiscalModel) {
        this.notafiscal = NotaFiscalModel;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(nome_razao, CNPJ, cpf, natureza_operacao, productId ) {
        try {
            const newRegistro = await this.notafiscal.create({nome_razao, CNPJ, cpf, natureza_operacao, productId});
            return newRegistro;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async update(id, updates) {
        try {
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
    
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.notafiscal.update(updates, {
                where: { id },
            });
            // Verificar se algum registro foi atualizado
            if (updatedRowsCount === 0) {
                throw new Error("Nenhum registro encontrado para atualização");
            } else {
                // Retornar algo específico para indicar que a atualização foi bem-sucedida
                return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
            }
        } catch (error) {
            // Lançar novamente o erro para ser tratado na camada de controle
            throw error;
        }
            
    }
  
  
    //--------------------------------------------------------------------------------------------------//
  
    async findAllNotafiscal(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
        
            const allNotas = await this.notafiscal.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return allNotas;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findNotaFiscalById(id) {
        try {
            const registro = await this.notafiscal.findOne({ where: { id } });
            return registro;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id) {
      try {
        const result = await this.notafiscal.destroy({
          where: { id: id }
        });
    
        if (result === 0) {
          throw new Error('Registro não encontrado');
        }
    
        return { message: 'Registro deletado com sucesso' };
      } catch (error) {
        throw error;
      }
  }
  
  }
  
  module.exports = NotaFiscalService;
  