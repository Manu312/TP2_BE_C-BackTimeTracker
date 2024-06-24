const AuthService = require("../services/auth.service");
const JwtUtils = require("./jwt");

module.exports = {
  async searchUserById(id) {
    const findUserById = await AuthService.findUserById(id);

    if (!findUserById) {
      throw new Error("Usuario no encontrado");
    }
    return findUserById;
  },
};
