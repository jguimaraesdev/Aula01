// ./controllers/departmentController.js
class DepartmentController {
  constructor(departmentService) {
      this.departmentService = departmentService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { nome } = req.body;
      const UserId = req.userId; // Suponho que você tenha o ID do usuário na requisição
      try {
          const newDepartment = await this.departmentService.create(nome, UserId);
          res.status(200).json(newDepartment);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir o novo departamento" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const departmentId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(departmentId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.departmentService.update(departmentId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Departamento não encontrado", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllDepartments(req, res) {
      const { page, pageSize } = req.query;
      try {
          const departments = await this.departmentService.findAllDepartments(page, pageSize);
          res.status(200).json(departments);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar departamentos" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findDepartmentById(req, res) {
      const departmentId = req.params.id;
      try {
          const department = await this.departmentService.findDepartmentById(departmentId);
          if (department) {
              res.status(200).json(department);
          } else {
              res.status(404).json({ error: "Departamento não encontrado" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//
  
  async delete (req, res){
    try{
        await this.departmentService.delete(req.params.id);
        res.status(204).send();

    }catch(erro){
        res.status(400).json({ error: error.message});
    }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = DepartmentController;
