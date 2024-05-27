// ./controllers/userController.js

class userController{
    constructor(userService){
        this.userService = userService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req,res){
        const {nome, login, email, senha, status} = req.body;
        try{
            const novoUser = await this.userService.create(nome, login, email, senha, status);
            res.status(200).json(novoUser);
        }
        catch(error){
            res.status(500).json({error:"Erro ao inserir o novo usuário"});
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
        const userId = req.params.id;
        const updates = req.body;
        try {
             // Verificar se o ID do registro é um número válido
             if (isNaN(userId )) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
    
            // Chamar o método update da userService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.userService.update(userId, updates);
            // Verificar se o depósito foi encontrado e atualizado com sucesso
            if (updatedRowsCount > 0) {
                return res.status(200).json({ message: "Registro atualizado com sucesso", updatedRowsCount, updatedRows });
            } else {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
        } catch (error) {
            // Tratar erros gerais
            console.error("Erro ao atualizar registro:", error);
            return res.status(500).json({ error: "Erro ao atualizar registro" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async findAllUser(req, res) {
        const {page, pageSize} = req.query;
        try {
          const users = await this.userService.findAllUser(page, pageSize);
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }
        
    //--------------------------------------------------------------------------------------------------//
    async findUserbyId(req, res) {
        const userId = req.params.id; // Obter o ID do usuário dos parâmetros da URL
        try {
            const oneUser = await this.userService.findUserbyId(userId); // Chamar a função do serviço passando apenas o ID
            if (oneUser) {
                res.status(200).json(oneUser);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        }catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async delete (req, res){
        try{
            await this.userService.delete(req.params.id);
            res.status(204).send();
    
        }catch(erro){
            res.status(400).json({ error: error.message});
        }
    }

    //--------------------------------------------------------------------------------------------------//
}
module.exports = userController;