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
            const [updatedRowsCount, updatedRows] = await this.Deposit.update(updates, {
                where: { id },
                returning: true // Para retornar os registros atualizados
            });
            return { updatedRowsCount, updatedRows };
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllDeposits() {
        try {
            const deposits = await this.Deposit.findAll();
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
