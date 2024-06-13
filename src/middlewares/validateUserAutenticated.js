const JwtUtils = require('../utils/jwt');
const validateUserAutenticated = () =>{
    return (req,res,next)=>{
        try{
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }
            const decodedToken = JwtUtils.verifyToken(token);
            if (!decodedToken) {
                return res.status(403).json({ error: 'Failed to authenticate token' });
            }
            next();
        }catch(err){
            console.error("validateRoleUser ~~ Error al validar el rol del usuario:", err);
            return res.status(500).json({ error: 'An error occurred while validating user role' });
        }
    }
}
module.exports = validateUserAutenticated;