const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

const { sendEmail } = require('./email.service');
const { resetPasswordTemplate } = require('../utils/emailTemplate');

class AuthService{
    static async register(userData){
        try{
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = {...userData, password: hashedPassword};
            return await User.create({...user});
        }catch(err){
            console.error('auth.service ~~ Error al registrar el usuario:', err);
            throw err;
        }
    }
    static async login(username, password){
        try{
            const user = await User.findOne({where: {username: username}});
            if(!user){
                throw new Error('Usuario no encontrado');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                throw new Error('Contraseña incorrecta');
            }
            const jwtToken = jwt.generateToken({id: user.id, username: user.username, role: user.role});
            return {token:jwtToken, user:user};
        }catch(err){
            console.error('auth.service ~~ Error al iniciar sesión:', err);
            throw err;
        }
    }
    static async forgotPasswordRequest(email){
        try{
            const user = await User.findOne({where: {email:email}});
            if(!user){
                throw new Error('Usuario no encontrado');
            }
            console.log(`auth.service ~~ Enviar email con link para recuperar la contraseña a ${user.email}`);
            //TODO email
            const token = jwt.generateToken({username: user.username});
            const resetPasswordLink = `http://localhost:8000/api/v1/auth/reset-password/${token}`;
            const emailContent  = resetPasswordTemplate(user.username, resetPasswordLink);
            await sendEmail(user.email, 'Restablecer contraseña', '', emailContent);
        }catch(err){
            console.error('auth.service ~~ Error al recuperar la contraseña:', err);
            throw err;
        }
    }
    static async resetPassword(token, password){
        try{
            const user = jwt.verifyToken(token);
            if(!user){
                throw new Error('Token inválido');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.updateUser(user.username, {password: hashedPassword});
        }catch(err){
            console.error('auth.service ~~ Error al restablecer la contraseña:', err);
            throw err;
        }
    }
}

module.exports = AuthService;