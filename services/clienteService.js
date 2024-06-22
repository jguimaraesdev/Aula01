// ./services/movimentsProductService.js
class ClienteService {
    constructor(ClienteModel) {
        this.clienteservice = ClienteModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(nome, CPF, userId) {
        try {
            const result = await this.clienteservice.create({nome, CPF, userId});
            return result;
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
            const [updatedRowsCount, updatedRows] = await this.clienteservice.update(updates, {
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

    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const result = await this.clienteservice.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findById(id) {
        try {
            const result = await this.clienteservice.findOne({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async delete(id) {
        try {
          const result = await this.clienteservice.destroy({
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
      
    
    //--------------------------------------------------------------------------------------------------//
    
    
}

module.exports = ClienteService;
