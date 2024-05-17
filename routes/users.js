//./routes/users.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const UserService = require('../services/servicesAcessManagement/userService');
const AuthenticateToken = require('../services/servicesAcessManagement/authenticateToken');
const UserController = require('../controllers/controllersAccessManagement/userController');

const secretKey = 'SUA_CHAVE_SECRETA'; // Chave secreta do token JWT

const authenticateToken = new AuthenticateToken(secretKey);
const userService = new UserService(db.User, authenticateToken);
const userController = new UserController(userService);

//--------------------------------------------------------------------------------------------------//
router.get('/', (req, res, next) => {
  res.send('Módulo de usuários está rodando');
});

router.post('/newUser', (req, res, next) => {
  userController.create(req, res);
});

router.post('/loginUser', (req, res, next) => {
  userController.loginUser(req, res);
});

// Rota de atualização
router.put('/updateUser/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  userController.update(req, res);
});

router.get('/allUsers', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  userController.findAllUser(req, res);
})

router.get('/findUserbyId/:id', (req, res, next) => {
  userController.findUserbyId(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
