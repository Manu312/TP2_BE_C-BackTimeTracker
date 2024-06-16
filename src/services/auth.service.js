const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

const { sendEmail } = require("./email.service");
const { resetPasswordTemplate } = require("../utils/emailTemplate");
const sequelize = require("../config/db");

class AuthService {
  static async register(userData) {
    const transaction = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = { ...userData, password: hashedPassword, role: "user" };
      //Validacion para que no se repitan los usuarios.
      const existCurrentEmail = await User.findOne({ where: { email: user.email } });
      if(existCurrentEmail) return null;

      const user_created = await User.create({ ...user }, { transaction });
      const jwtToken = jwt.generateToken({
        id: user_created.id,
        username: user_created.username,
        role: user_created.role,
      });
      await transaction.commit();
      console.log(user_created, "user created");
      console.log(jwtToken, "token");

      return { token: jwtToken, user: user_created };
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        // Handle unique constraint violation error
        const fieldName = Object.keys(err.fields)[0]; // Get the first field that caused the violation
        const errorMessage = `El ${fieldName} "${err.fields[fieldName]}" ya está en uso.`;
        err.message = errorMessage;
      } else {
        err.message = "Error al registrar el usuario";
      }
      await transaction.rollback();
      err.message = "Error al registrar el usuario";
      console.error("auth.service ~~ Error al registrar el usuario:", err);
      throw err;
    }
  }
  static async login(username, password) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Contraseña incorrecta");
      }
      const jwtToken = jwt.generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      return { token: jwtToken, user: user };
    } catch (err) {
      console.error("auth.service ~~ Error al iniciar sesión:", err.message);
      throw err;
    }
  }
  static async forgotPasswordRequest(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      console.log(
        `auth.service ~~ Enviar email con link para recuperar la contraseña a ${user.email}`
      );
      //TODO email
      const token = jwt.generateToken({ username: user.username });
      const resetPasswordLink = `http://localhost:8000/api/v1/auth/reset-password/${token}`;
      const emailContent = resetPasswordTemplate(
        user.username,
        resetPasswordLink
      );
      await sendEmail(user.email, "Restablecer contraseña", "", emailContent);
    } catch (err) {
      console.error("auth.service ~~ Error al recuperar la contraseña:", err);
      throw err;
    }
  }
  static async resetPassword(token, password) {
    try {
      const user = jwt.verifyToken(token);
      if (!user) {
        throw new Error("Token inválido");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateUser(user.username, { password: hashedPassword });
    } catch (err) {
      console.error("auth.service ~~ Error al restablecer la contraseña:", err);
      throw err;
    }
  }
  static findUserById = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (err) {
      console.error("auth.service ~~ Error al buscar usuario por id:", err);
      throw err;
    }
  };
  static async refreshToken(token) {
    try{
      const decodedToken = jwt.verifyToken(token);
      if(!decodedToken) throw new Error("Token inválido");
      const user = await User.findByPk(decodedToken.id);
      if(!user) throw new Error("Usuario no encontrado");
      const newToken = jwt.generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      return newToken;
    }catch(error){
      console.error("auth.service ~~ Error al refrescar el token:", error);
      throw error;
    }
  }
}

module.exports = AuthService;
