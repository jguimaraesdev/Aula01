// ./services/xtelefoneService.js

class XtelefoneService {
    constructor(XtelefoneModel) {
        this.Xtelefone = XtelefoneModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(DDD, numero, userId) {
        try {
            const newXtelefone = await this.Xtelefone.create({ DDD, numero, userId });
            return newXtelefone;
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
            const [updatedRowsCount, updatedRows] = await this.Xtelefone.update(updates, {
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

    async findAllXtelefones(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
        
            const allXtelefones = await this.Xtelefone.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return allXtelefones;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findXtelefoneById(id) {
        try {
            const xtelefone = await this.Xtelefone.findOne({ where: { id } });
            return xtelefone;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async delete(id){
        return this.Xtelefone.delete({ where: { id }});
    }

}

module.exports = XtelefoneService;
