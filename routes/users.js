//routes/user.js
var express = require('express');
var router = express.Router();

const db = require('../models');
const userService = require('../services/userService');
const UserService = new userService(db.User);
const userController = require('../controllers/userController');
const UserController = new userController(UserService);

const authenticateToken = require('../services/authMiddleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Modulo de usuários está rodando');
});

// Rota para criar um novo usuário
router.post('/newUser',function(req, res, next){
  UserController.create(req,res);
});

// Rota para buscar todos os usuários (requer autenticação)
router.get('/findAllUser', authenticateToken, function(req, res, next) {
  UserController.findAllUser(req, res);
});

// Rota para buscar um usuário por ID
router.get('/findUserbyId', function(req, res, next){
  UserController.findUserbyId(req, res);
});

// Rota para fazer login de usuário
router.get('/loginUser', function(req, res, next){
  UserController.loginUser(req, res);
})

module.exports = router;
