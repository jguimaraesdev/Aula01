// ./controllers/DepartmentController.js



class DepartmentController {
    constructor(departmentService, CostCenterService) {
      this.departmentService = departmentService;
      this.costcenterService = CostCenterService;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(req, res) {
      const { nome } = req.body;
      
      try {
        const result = await this.departmentService.create(nome);

        res.status(201).json(result);
      } catch (error) {
        console.error("Erro ao inserir o novo registro:", error);
        res.status(500).json({ error: "Erro ao inserir o novo registro", details: error.message });
      }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(req, res) {
      const id = req.params.id;
      const updates = req.body;
      try {
        if (isNaN(id)) {
          return res.status(400).json({ error: "ID de registro inválido" });
        }
  
        if (!updates || Object.keys(updates).length === 0) {
          return res.status(400).json({ error: "Dados de atualização inválidos" });
        }
  
        const { updatedRowsCount, updatedRows } = await this.departmentService.update(id, updates);
  
        if (updatedRowsCount > 0) {
          return res.status(200).json({ message: "Registro atualizado com sucesso" });
        } else {
          res.status(404).json({ error: "Registro não encontrado", updatedRowsCount, updatedRows });
        }
      } catch (error) {
        console.error("Erro ao atualizar registro:", error);
        res.status(500).json({ error: "Erro ao atualizar registro", details: error.message });
      }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findAll(req, res) {
      const { page, pageSize } = req.query;
      try {
        const result = await this.departmentService.findAll(page, pageSize);
        res.status(200).json(result);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
        res.status(500).json({ error: "Erro ao buscar registros", details: error.message });
      }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findById(req, res) {
      const id = req.params.id;
      try {
        const result = await this.departmentService.findById(id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "Registro não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao buscar registro por ID:", error);
        res.status(500).json({ error: "Erro interno do servidor", details: error.message });
      }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async delete(req, res) {
      const id = req.params.id;
  
      try {
        const result = await this.departmentService.delete(id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "Registro não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao deletar registro:", error);
        res.status(500).json({ error: error.message });
      }
    }
  
    //--------------------------------------------------------------------------------------------------//
  }
  
  module.exports = DepartmentController;
  