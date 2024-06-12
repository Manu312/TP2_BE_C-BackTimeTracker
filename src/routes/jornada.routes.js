const express = require("express");
const router = express.Router();
const JornadaController = require("../controllers/jornada.controller");

router.post("/create", JornadaController.createJornada);
router.get("/:idProject/jornadas", JornadaController.getAllJornadasByProject);

module.exports = router;
