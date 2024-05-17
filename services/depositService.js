// ./services/depositService.js

class DepositService {
    constructor(DepositModel) {
        this.Deposit = DepositModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(central) {
        try {
            const newDeposit = await this.Deposit.create({ central });
            return newDeposit;
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
    
            // Atualizar os registros na tabela Deposit
            const [updatedRowsCount, updatedRows] = await this.Deposit.update(updates, {
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

    async findAllDeposits(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;

            const deposits = await this.Deposit.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            
            return deposits;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findDepositById(id) {
        try {
            const deposit = await this.Deposit.findOne({ where: { id } });
            return deposit;
        } catch (error) {
            throw error;
        }
    }
    //--------------------------------------------------------------------------------------------------//
    
}

module.exports = DepositService;
