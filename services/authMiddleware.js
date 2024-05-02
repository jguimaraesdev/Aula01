// ./services/authenticateToken.js
const jwt = require('jsonwebtoken');
const secretKey = 'SUA_CHAVE_SECRETA'; // Sua chave secreta para assinar os tokens JWT

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticação inválido' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = authenticateToken;
