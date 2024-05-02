// ./controllers/userController.js

class userController{
    constructor(userService){
        this.userService = userService;
    }
    async create(req,res){
        const {nome, login, email, senha} = req.body;
        try{
            const novoUser = await this.userService.create(nome, login, email, senha);
            res.status(200).json(novoUser);
        }
        catch(error){
            res.status(500).json({error:"Erro ao inserir o novo usuário"});
        }
    }

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

    async findAllUser(req, res) {
        try {
          const users = await this.userService.findAllUser();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }
        
    

    async findUserbyId(req, res){
        const {id, senha} = req.body;
        try{
            const oneUser = await this.userService.findUserbyId(id, senha);
            res.status(200).json(oneUser);
        }
        catch(error){
            res.status(500).json({error:"Login invalido"});
        }
        
    }
}
module.exports = userController;