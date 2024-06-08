const express = require('express');
const router = express.Router();
const JornadaController = require('../controllers/jornada.controller');

router.post('/create', JornadaController.createJornada);

module.exports = router;