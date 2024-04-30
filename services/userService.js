// ./services/userService.js
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Você pode ajustar esse valor conforme necessário
const jwt = require('jsonwebtoken');
const secretKey = 'SUA_CHAVE_SECRETA'; // Use uma chave secreta segura

class userService{

    constructor(userModel){
        this.User = userModel;
    }
    async create(nome, login, email, senha){
        try{
            const senhaHash = await bcrypt.hash(senha, saltRounds); // Criptografa a senha
            const novoUser = await this.User.create(
                {
                    nome:nome,
                    login:login,
                    email:email,
                    senha:senhaHash // Usa a senha criptografada
                }
            );
            const { senha: _, ...userWithoutPassword } = novoUser.dataValues;
            return userWithoutPassword; // Retorna o usuário sem a senha
            //return novoUser? novoUser : null;
        }

        catch(error){
            throw error;
        }
    }
    async verifyUser(login, senha){
        try{
            const user = await this.User.findOne({ where: { login } });
            if (!user) return null;
    
            const match = await bcrypt.compare(senha, user.senha);
            return match ? user : null;
        }
        catch(error){
            throw error;
        }
    }
    async loginUser(login, senha){
        try{
            const user = await this.User.findOne({ where: { login } });
            if (!user) return null;

            const senhaMatch = await bcrypt.compare(senha, user.senha);
            if (senhaMatch) {
                const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' }); // Ajuste a duração conforme necessário
                return { user: user.id, token };
            } else {
                return null;
            }
        } catch(error) {
            throw error;
        }
    }    
    //findAllUser
    async findAllUser(){
        try{
            const AllUsers = await this.User.findAll({
                attributes: { exclude: ['senha'] }
            });
            return AllUsers? AllUsers :null;
        }
        catch(error){
            throw error;
        }
    }
    //findUserbyId
    async findUserbyId(id, senha){
        try{
            const OneUser = await this.User.findOne({ where: { id } });
            return OneUser? OneUser :null;
        }
        catch(error){
            throw error;
        }
    }
}


module.exports = userService;