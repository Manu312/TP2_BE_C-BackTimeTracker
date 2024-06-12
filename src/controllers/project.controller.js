const AuthService = require("../services/auth.service");
const ProjectService = require("../services/project.service");
const { searchUserWithToken } = require("../utils/common");

class ProjectController {
  static async createProject(req, res) {
    try {
      //@TODO AUGUSTO: HECHO. MIDDLEWARE!
      const token = req.headers.authorization.split(" ")[1];

      const findUserById = await searchUserWithToken(token);
      const projectData = {
        name: req.body.project_name,
        description: req.body.description ?? "",
        pricePerHour: parseInt(req.body.price_per_hour),
        userId: findUserById.id,
      };

      const project = await ProjectService.createProject(projectData);
      if (!project) {
        return res.status(400).json({ error: "No se pudo crear el projecto" });
      }

      res.status(201).json({ message: "Project creado con éxito", project });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllProjectsByUser(req, res) {
    try {
      //@TODO AUGUSTO: HECHO. MIDDLEWARE!

      const token = req.headers.authorization.split(" ")[1];

      const findUserById = await searchUserWithToken(token);

      if (!findUserById) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      const projects = await ProjectService.getAllProjectsByUser(findUserById);

      res.status(201).json({
        message: "Obtener projectos por usuario exitoso",
        username: findUserById.username,
        projects: projects,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProjectById(req, res) {
    try {
      const projectId = req.params.projectId;
      const project = await ProjectService.getProjectById(projectId);
      if (!project)
        return res.status(400).json({ error: "Project no encontrado" });
      res
        .status(200)
        .json({ message: "obtener project por id exitoso", project: project });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProject(req, res) {
    try {
      const projectId = req.params.id;
      const projectData = {
        name: req.body.name,
        pricePerHour: req.body.pricePerHour,
        description: req.body.description,
      };
      if (!projectId)
        return res.status(400).json({ error: "Id de project no encontrado" });
      if (!projectData)
        return res
          .status(400)
          .json({ error: "Datos de project no encontrados" });

      const updatedProject = await ProjectService.updateProject(
        projectId,
        projectData
      );
      if (updatedProject) {
        res
          .status(200)
          .json({ message: "Project updated exitoso", updatedProject });
      } else {
        res.status(404).json({ message: "Project no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteProject(req, res) {
    try {
      const projectId = req.params.id;
      if (!projectId)
        return res.status(400).json({ error: "Id de projecto no encontrado" });
      const deleted = await ProjectService.deleteProject(projectId);
      if (deleted) {
        res.status(200).json({ message: "Project deleted successfully" });
      } else {
        res.status(404).json({ message: "Project no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProjectController;
