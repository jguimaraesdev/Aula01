// ./controllers/SupplierController.js

class SupplierController {
  constructor(supplierService) {
      this.supplierService = supplierService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { nome, contato } = req.body;
      try {
          const newSupplier = await this.supplierService.create(nome, contato);
          res.status(200).json(newSupplier);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir o novo fornecedor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const supplierId = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(supplierId)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.supplierService.update(supplierId, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Fornecedor não encontrado", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllSuppliers(req, res) {
      const { page, pageSize } = req.query;
      try {
          const suppliers = await this.supplierService.findAllSuppliers(page, pageSize);
          res.status(200).json(suppliers);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar fornecedores" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findSupplierById(req, res) {
      const supplierId = req.params.id;
      try {
          const supplier = await this.supplierService.findSupplierById(supplierId);
          if (supplier) {
              res.status(200).json(supplier);
          } else {
              res.status(404).json({ error: "Fornecedor não encontrado" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete (req, res){
    try{
        await this.SupplierController.delete(req.params.id);
        res.status(204).send();

    }catch(erro){
        res.status(400).json({ error: error.message});
    }
  }

  //--------------------------------------------------------------------------------------------------//

}

module.exports = SupplierController;
