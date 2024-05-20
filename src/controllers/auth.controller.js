const AuthService = require('../services/auth.service');

class AuthController {
  static async register(req, res) {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
        const { username, password } = req.body;
        console.log("username: %s password: %s", username,password);
        const { token, user } = await AuthService.login(username, password);
        res.header('Authorization', `Bearer ${token}`);
        res.json({ message: 'Inicio de sesión exitoso', user:user, token:token});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      res.json({ message: 'Correo de restablecimiento enviado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      res.json({ message: 'Contraseña restablecida con éxito' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
