// ./services/userService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userModel, authenticateToken) {
        this.User = userModel;
        this.authenticateToken = authenticateToken;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(nome, login, email, senha) {
        try {
            const senhaHash = await bcrypt.hash(senha, 10);
            const novoUser = await this.User.create({
                nome: nome,
                login: login,
                email: email,
                senha: senhaHash
            });
            const { senha: _, ...userWithoutPassword } = novoUser.dataValues;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async verifyUser(login, senha) {
        try {
            const user = await this.User.findOne({ where: { login } });
            if (!user) return null;
            const match = await bcrypt.compare(senha, user.senha);
            return match ? user : null;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async loginUser(login, senha) {
        try {
            const user = await this.verifyUser(login, senha);
            if (user) {
                const token = this.authenticateToken.generateToken(user.id);
                return { user: user.id, token };
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllUser() {
        try {
            const allUsers = await this.User.findAll({ attributes: { exclude: ['senha'] } });
            return allUsers;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findUserbyId(id) {
        console.log('Procurando usuário com ID:', id);
        try {
            const oneUser = await this.User.findOne({ where: { id }, attributes: { exclude: ['senha'] }});
            console.log('Usuário encontrado:', oneUser);
            return oneUser ? oneUser : null;
        } catch (error) {
            console.error('Erro ao procurar usuário por ID:', error);
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
}

module.exports = UserService;
