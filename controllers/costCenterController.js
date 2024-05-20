// ./controllers/costCenterController.js

class CostCenterController {
  constructor(costCenterService) {
      this.costCenterService = costCenterService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { code, name } = req.body;
      try {
          const newCostCenter = await this.costCenterService.create(code, name);
          res.status(200).json(newCostCenter);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir o novo centro de custo" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const costCenterId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(costCenterId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.costCenterService.update(costCenterId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Centro de custo não encontrado", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllCostCenters(req, res) {
      const { page, pageSize } = req.query;
      try {
          const costCenters = await this.costCenterService.findAllCostCenters(page, pageSize);
          res.status(200).json(costCenters);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar centros de custo" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findCostCenterById(req, res) {
      const costCenterId = req.params.id;
      try {
          const costCenter = await this.costCenterService.findCostCenterById(costCenterId);
          if (costCenter) {
              res.status(200).json(costCenter);
          } else {
              res.status(404).json({ error: "Centro de custo não encontrado" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  async delete (req, res){
    try{
        await this.costCenterService.delete(req.params.id);
        res.status(204).send();

    }catch(erro){
        res.status(400).json({ error: error.message});
    }
  }
  

  //--------------------------------------------------------------------------------------------------//
}

module.exports = CostCenterController;
