const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'my_secret_jwt'; //TODO Cambiar por una clave mas segura

class JwtUtils {
  static generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}

module.exports = JwtUtils;