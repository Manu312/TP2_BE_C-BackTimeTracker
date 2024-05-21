const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

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
            console.log('auth.service ~~ username:',username,'password:',password)
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
            //TODO Despues del mail apunta a la ruta de resetPassword
            return user;
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