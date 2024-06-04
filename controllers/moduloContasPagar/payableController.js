// controllers/payableController.js
class PayableController {
    constructor(payableService) {
        this.payableService = payableService;
    }

    async create(req, res) {
        const data = req.body;
        try {
            const newPayable = await this.payableService.create(data);
            res.status(201).json(newPayable);
        } catch (error) {
            res.status(500).json({ error: "Error creating payable" });
        }
    }

    async update(req, res) {
        const payableId = req.params.id;
        const updates = req.body;
        try {
            const updatedPayable = await this.payableService.update(payableId, updates);
            res.status(200).json(updatedPayable);
        } catch (error) {
            res.status(500).json({ error: "Error updating payable" });
        }
    }

    async findAll(req, res) {
        const { page, pageSize } = req.query;
        try {
            const payables = await this.payableService.findAll(page, pageSize);
            res.status(200).json(payables);
        } catch (error) {
            res.status(500).json({ error: "Error fetching payables" });
        }
    }

    async findById(req, res) {
        const payableId = req.params.id;
        try {
            const payable = await this.payableService.findById(payableId);
            if (payable) {
                res.status(200).json(payable);
            } else {
                res.status(404).json({ error: "Payable not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching payable" });
        }
    }

    async delete(req, res) {
        const payableId = req.params.id;
        try {
            const result = await this.payableService.delete(payableId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error deleting payable" });
        }
    }
}

module.exports = PayableController;
