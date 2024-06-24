const JwtUtils = require("../utils/jwt");
// Tuve problemas para hacerlo asyncrono
const validateRoleUser =  (requiredRole) => {
    return (req, res, next) => {
        try {
            if (req.user.role !== requiredRole) {
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