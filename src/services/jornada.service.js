const Jornada = require("../models/jornada.model");
const defineAssociations = require("../config/associations");
const sequelize = require("../config/db");
class JornadaService {
  static async createJornada(jornadaData) {
    try {
      return await Jornada.create({ ...jornadaData });
    } catch (err) {
      console.error("jornada.service ~~ Error al crear el jornada:", err);
      throw err;
    }
  }
  static async getJornadaById(projectId,jornadaId) {
    try {
      console.log(jornadaId,projectId);
      const jornada = await Jornada.findOne({
        where: {
          projectId: projectId,
          id: jornadaId,
        },
      });
      if (!jornada) throw new Error("Jornada no encontrada");
      return jornada;
    } catch (err) {
      console.error("jornada.service ~~ Error al obtener la jornada por id:", err);
      throw err;
    }
  }
  static async getAllJornadasByProject(project) {
    try {
      const jornadas = await Jornada.findAll({
        where: {
          projectId: project,
        },
      });
      if (!jornadas) throw new Error("Usuario no encontrado");
      return jornadas;
    } catch (err) {
      console.error(
        "project.service ~~ Error al obtener los projectos del usuario:",
        err
      );
      throw err;
    }
  }
  static async deleteJornada(projectId,jornadaId) {
    try {
      const jornada = await Jornada.findOne({
        where: {
          projectId: projectId,
          id: jornadaId,
        },
      });
      if (!jornada) return null;
      return await jornada.destroy();
    } catch (err) {
      console.error("jornada.service ~~ Error al eliminar la jornada:", err);
      throw err;
    }
  }
}

module.exports = JornadaService;
