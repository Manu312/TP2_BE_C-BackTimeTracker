const AuthService = require("../services/auth.service");

class AuthController {
  static async register(req, res) {
    try {
      const { token, user } = await AuthService.register(req.body);
      res.status(201)
      .set('Authorization', `Bearer ${token}`)
      .json({
        message: "Usuario registrado con éxito",
        user: user,
        token: token,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log("username: %s password: %s", username, password);
      const { token, user } = await AuthService.login(username, password);
      res.status(200)
      .set('Authorization', `Bearer ${token}`)
      .json({
        message: "Inicio de sesión exitoso",
        user: user,
        token: token,
      });
    } catch (err) {
      console.log(err.message, "mensaje en el controller");
      res.status(500).json({ error: err.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await AuthService.forgotPasswordRequest(email);
      res.json({ message: "Correo de restablecimiento enviado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      res.json({ message: "Contraseña restablecida con éxito" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async logout(req, res) {
    //Deberiamos almacenar el token en una blacklist
    try{
      const token = req.headers.Authorization.split(" ")[1];
      if(!token) return res.status(403).json({ error: 'No token provided' });
      return res.status(200)
      .set('Authorization', ``)
      .json({message: "Sesión cerrada con éxito"});
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
