const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const validateUserAutenticate = require('../middlewares/validateUserAutenticated');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/logout', validateUserAutenticate(),AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;