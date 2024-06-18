// ./services/purchaseService.js

class PurchaseService {
    constructor(PurchaseModel, RequisitionModel, QuotationModel, ProductModel, ControleProductModel) {
        this.Purchase = PurchaseModel;
        this.Requisition = RequisitionModel;
        this.Quotation = QuotationModel;
        this.Product = ProductModel;
        this.ControleProduct = ControleProductModel;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create(quantidade, custototal, tipoPagamento, supplierId, quotationId, userId) {
        const transaction = await this.Purchase.sequelize.transaction();
        try {
            // Insere dados na tabela purchase
            const result = await this.Purchase.create({ quantidade, custototal, tipoPagamento, supplierId, quotationId, userId }, { transaction });
    
            // Procura cotação para pegar id da requisição
            const data = await this.Quotation.findByPk(quotationId, { transaction });
    
            if (!data) {
                throw new Error('Cotação não encontrada');
            }
    
            const status = 'comprado';
    
            // Atualiza o status da requisição
            const result2 = await this.Requisition.update(
                { status },
                { where: { id: data.requisitionId }, transaction }
            );
    
            // Recebe dados da requisição para criação de produto
            const result3 = await this.Requisition.findByPk(data.requisitionId, { transaction });
    
            if (!result3) {
                throw new Error('Requisição não encontrada');
            }
    
            // Criando produto
            const result4 = await this.Product.create(
                { nome: result3.produto_requerido, descricao: '', status: 'ATIVO', supplierId: data.supplierId },
                { transaction }
            );
            
            //criando  um controle de produto
            const result5 = await this.ControleProduct.create(
                {movimento_tipo: 'Entrada', qtd_disponivel: quantidade, qtd_bloqueado: 0, valor_faturado: 0, productId: result4.id, depositId: 1 },
                {transaction}
            );

            await transaction.commit();
    
            return { result, data, result2, result3, result4, result5 };
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao criar e atualizar dados:', error);
            throw error;
        }
    }
    
     
  
    //--------------------------------------------------------------------------------------------------//
  
    async update(id, updates) {
        try {
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
  
            const [updatedRowsCount, updatedRows] = await this.Purchase.update(updates, {
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
  
    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const result = await this.Purchase.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findById(id) {
        try {
            const result = await this.Purchase.findOne({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id) {
        try {
          const result = await this.Purchase.destroy({
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

    //--------------------------------------------------------------------------------------------------//
    
    async getPurchasesBySupplier(supplierId) {
        try {
            const purchases = await this.Purchase.findAll({ where: { supplierId } });
            return purchases;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  

  
  }
  
  module.exports = PurchaseService;