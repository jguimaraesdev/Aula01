// ./services/userService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userModel, authenticateToken) {
        this.User = userModel;
        this.authenticateToken = authenticateToken;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(nome, login, email, senha, status) {
        try {
            const senhaHash = await bcrypt.hash(senha, 10);
            const novoUser = await this.User.create({
                nome: nome,
                login: login,
                email: email,
                senha: senhaHash,
                status: status
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

    async update(id, updates) {
        try {
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
    
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.User.update(updates, {
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

    async findAllUser(page = 1, pageSize = 10) {
        try {
            const offset =(page -1) *pageSize;
            const allUsers = await this.User.findAndCountAll({ 

                attributes: { exclude: ['senha'] },
                limit: pageSize,
                offset: offset 
            
            });
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
    
    async delete(id){
        return this.delete.delete({ where: { id }});
    }
}

module.exports = UserService;
