const JwtUtils = require("../utils/jwt");
// Tuve problemas para hacerlo asyncrono
const validateRoleUser =  (requiredRole) => {
    return (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            const decodedToken = JwtUtils.verifyToken(token);
            if (!decodedToken) {
                return res.status(403).json({ error: 'Failed to authenticate token' });
            }

            if (decodedToken.role !== requiredRole) {
                return res.status(403).json({ error: 'Insufficient role' });
            }
            next();
        } catch (err) {
            console.error("validateRoleUser ~~ Error al validar el rol del usuario:", err);
            return res.status(500).json({ error: 'An error occurred while validating user role' });
        }
    };
};

module.exports = validateRoleUser;