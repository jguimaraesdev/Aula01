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
            const [updatedRowsCount, updatedRows] = await this.Xtelefone.update(updates, {
                where: { id },
                returning: true // Para retornar os registros atualizados
            });
            return { updatedRowsCount, updatedRows };
        } catch (error) {
            throw error;
        }
    }


    //--------------------------------------------------------------------------------------------------//

    async findAllXtelefones() {
        try {
            const allXtelefones = await this.Xtelefone.findAll();
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
    
}

module.exports = XtelefoneService;
