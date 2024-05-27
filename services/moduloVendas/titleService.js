//service/titleService.js


class TitleService {
    constructor(TitleModel) {
        this.Title = TitleModel;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(numeroNotaFiscal, numeroParcela, valorOriginal, dataVencimento, situacao ) {
        try {
            const newTitle = await this.Title.create({ numeroNotaFiscal, numeroParcela, valorOriginal, dataVencimento, situacao });
            return newTitle;
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
            const [updatedRowsCount, updatedRows] = await this.Title.update(updates, {
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
  
    async findAllTitle(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
        
            const allTitle = await this.Title.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return allTitle;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findTitleById(id) {
        try {
            const title = await this.Title.findOne({ where: { id } });
            return title;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id) {
        try {
          const result = await this.Title.destroy({
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
  
  module.exports = TitleService;
  