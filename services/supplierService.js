// ./services/supplierService.js

class SupplierService {
  constructor(SupplierModel) {
      this.Supplier = SupplierModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(nome, contato) {
      try {
          const newSupplier = await this.Supplier.create({ nome, contato });
          return newSupplier;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(id, updates) {
      try {
          if (!id) {
              throw new Error("ID inválido para atualização");
          }

          const [updatedRowsCount, updatedRows] = await this.Supplier.update(updates, {
              where: { id },
          });

          if (updatedRowsCount === 0) {
              throw new Error("Nenhum registro encontrado para atualização");
          } else {
              return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
          }
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllSuppliers(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const suppliers = await this.Supplier.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return suppliers;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findSupplierById(id) {
      try {
          const supplier = await this.Supplier.findOne({ where: { id } });
          return supplier;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.Supplier.destroy({
        where: { id: id }
      });
  
      if (result === 0) {
        throw new Error('Registro não encontrado');
      }
  
      return { message: 'Registro deletado com sucesso' };
    } catch (error) {
      throw error;
    }
}

}

module.exports = SupplierService;
