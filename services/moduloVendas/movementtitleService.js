//service/movementtitleService.js


class MovementTitleService {
    constructor(MovementTitleModel) {
        this.MovementTitle = MovementTitleModel;
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async create( dataMovimento, qdataMovimento, valorMovimento, valorMulta, valorJuros, titleId  ) {
        try {
            const newMovement = await this.MovementTitle.create({ dataMovimento, qdataMovimento, valorMovimento, valorMulta, valorJuros, titleId});
            return newMovement;
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
    
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.MovementTitle.update(updates, {
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
  
    async findAllMovimentTitle(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
        
            const allMovementTitle = await this.MovementTitle.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return allMovementTitle;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
  
    async findMovimentTitleById(id) {
        try {
            const movement = await this.MovementTitle.findOne({ where: { id } });
            return movement;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id){
        return this.MovementTitle.delete({ where: { id }});
    }
  
  }
  
  module.exports = MovementTitleService;
  