// services/payableService.js
class PayableService {
    constructor(PayableModel) {
        this.payable = PayableModel;
    }

    async create(data) {
        try {
            const newPayable = await this.payable.create(data);
            return newPayable;
        } catch (error) {
            throw error;
        }
    }

    async update(id, updates) {
        try {
            const [updatedRowsCount, updatedRows] = await this.payable.update(updates, {
                where: { id },
                returning: true
            });
            if (updatedRowsCount === 0) {
                throw new Error("Payable not found");
            }
            return updatedRows[0];
        } catch (error) {
            throw error;
        }
    }

    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const payables = await this.payable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                include: ['supplier']
            });
            return payables;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const payable = await this.payable.findOne({
                where: { id },
                include: ['supplier']
            });
            return payable;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.payable.destroy({
                where: { id }
            });
            if (result === 0) {
                throw new Error("Payable not found");
            }
            return { message: 'Payable deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PayableService;
