// ./controllers/userController.js

class userController{
    constructor(userService){
        this.userService = userService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req,res){
        const {nome, login, email, senha, status} = req.body;
        try{
            const result = await this.userService.create(nome, login, email, senha, status);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({error:"Erro ao inserir o registro"});
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async loginUser(req, res){
        const { login, senha } = req.body;
        try{
            const result = await this.userService.loginUser(login, senha);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } catch(error){
            res.status(500).json({ error: "Internal server error" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async update(req, res) {
        const Id = req.params.id;
        const updates = req.body;
        try {
            
             if (isNaN(Id )) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
            const { updatedRowsCount, updatedRows } = await this.userService.update(Id, updates);
          
            if (updatedRowsCount > 0) {
                return res.status(200).json({ message: "Registro atualizado com sucesso", updatedRowsCount, updatedRows });
            } else {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
        } catch (error) {
            
            console.error("Erro ao atualizar registro:", error);
            return res.status(500).json({ error: "Erro ao atualizar registro" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async findAll(req, res) {
        const {page, pageSize} = req.query;
        try {
          const result = await this.userService.findAll(page, pageSize);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }
        
    //--------------------------------------------------------------------------------------------------//
    async findbyId(req, res) {
        const Id = req.params.id; 
        try {
            const result = await this.userService.findbyId(Id); 
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "Registtro não encontrado" });
            }
        }catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async delete (req, res){
        const Id = req.params.id;
    
        const user = await this.userService.delete(Id);
              if (user) {
                  res.status(200).json(user);
              } else {
                  res.status(404).json({ error: "Registro não deletado" });
              }
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
    

    //--------------------------------------------------------------------------------------------------//
}
module.exports = userController;