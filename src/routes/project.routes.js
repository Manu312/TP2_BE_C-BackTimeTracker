const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/project.controller");
const validateUserAutenticated = require("../middlewares/validateUserAutenticated");

router.use(validateUserAutenticated());
router.post("/create", ProjectController.createProject);
router.get("/all", ProjectController.getAllProjectsByUser);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

module.exports = router;
