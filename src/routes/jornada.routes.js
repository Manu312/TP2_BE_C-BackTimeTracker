const express = require("express");
const router = express.Router();
const JornadaController = require("../controllers/jornada.controller");
const validateRoleUSer = require("../middlewares/validateRoleUser");
const validateUserAutenticated = require("../middlewares/validateUserAutenticated");

router.use(validateUserAutenticated());

router.post("/create", JornadaController.createJornada);
router.get("/:idProject/jornadas", JornadaController.getAllJornadasByProject);
router.get("/:idProject/jornadas/:idJornada", JornadaController.getJornadaById);
router.delete(
  "/:idProject/jornadas/:idJornada",
  validateRoleUSer("admin"),
  JornadaController.deleteJornada
);

module.exports = router;
