const Project = require("../models/project.model");
const User = require("../models/user.model");
const defineAssociations = require("../config/associations");
const sequelize = require("../config/db");

class ProjectService {
  static async createProject(projectData) {
    try {
      return await Project.create({ ...projectData });
    } catch (err) {
      console.error("project.service ~~ Error al crear el projecto:", err);
      throw err;
    }
  }
  static async getAllProjectsByUser(user) {
    try {
      const projects = await Project.findAll({
        where: {
          userId: user.id,
        },
      });
      if (!projects) throw new Error("Usuario no encontrado");
      return projects;
    } catch (err) {
      console.error(
        "project.service ~~ Error al obtener los projectos del usuario:",
        err
      );
      throw err;
    }
  }
  static async getProjectById(projectId) {
    try {
      return await Project.findByPk(projectId);
    } catch (err) {
      console.error(
        "project.service ~~ Error al obtener el projecto por id:",
        err
      );
      throw err;
    }
  }
  static async updateProject(projectId, projectData) {
    try {
      const project = await Project.findByPk(projectId);
      if (!project) return null;
      return await project.update(projectData, {
        where: { id: projectId },
      });
    } catch (err) {
      console.error("project.service ~~ Error al actualizar el projecto:", err);
      throw err;
    }
  }
  static async deleteProject(projectId) {
    try {
      const project = await Project.findByPk(projectId);
      if (!project) return null;
      return await project.destroy();
    } catch (err) {
      console.error("project.service ~~ Error al eliminar el projecto:", err);
      throw err;
    }
  }
}

module.exports = ProjectService;
