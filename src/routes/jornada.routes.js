const express = require("express");
const router = express.Router();
const JornadaController = require("../controllers/jornada.controller");
const validateUserRole = require("../middlewares/validateRoleUser");
const validateUserAutenticated = require('../middlewares/validateUserAutenticated');

router.post("/create", JornadaController.createJornada);
router.get("/:idProject/jornadas", JornadaController.getAllJornadasByProject);
router.delete("/:idProject/jornadas/:idJornada", validateUserAutenticated(), validateUserRole(["admin"]), JornadaController.deleteJornada);

module.exports = router;
