const AuthService = require("../services/auth.service");
const JwtUtils = require("./jwt");

module.exports = {
  async searchUserWithToken(token) {
    const decryptedToken = JwtUtils.verifyToken(token);

    if (!decryptedToken) {
      throw new Error("Token inválido");
    }

    const findUserById = await AuthService.findUserById(decryptedToken.id);

    if (!findUserById) {
      throw new Error("Usuario no encontrado");
    }
    return findUserById;
  },
};
