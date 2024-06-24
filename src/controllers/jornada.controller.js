const JornadaService = require("../services/jornada.service");
const { searchUserById } = require("../utils/common");
const { verifyToken } = require("../utils/jwt");

class JornadaController {
  static async createJornada(req, res) {
    try {
      const idUser = req.user.id;

      const findUserById = await searchUserById(idUser);
      if (!findUserById) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      
      //TODO validar en el front
      const jornadaData = {
        fechaInicio: new Date(req.body.fechaInicio),
        fechaCierre: new Date(req.body.fechaCierre),
        hoursWorked: req.body.hoursWorked,
        price: req.body.price,
        projectId: parseInt(req.body.idProject),
      };
      //TODO validar en el front
      if(jornadaData.fechaInicio.year<Date.now.year || jornadaData.fechaCierre.year<Date.now.year) throw new Error("Fecha invalida");
      if(jornadaData.fechaInicio.month<Date.now.month || jornadaData.fechaCierre.month<Date.now.month) throw new Error("Fecha invalida");
      const jornada = await JornadaService.createJornada(jornadaData);
      if (!jornada)
        return res.status(400).json({ error: "No se pudo crear la jornada" });
      res.status(201).json({
        message: "Jornada creada con éxito",
        jornada,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getJornadasById(req, res) {
  }
  static async getAllJornadasByProject(req, res) {
    try {
      const project = Number(req.params.idProject);
      const idUser = req.user.id;

      const findUserById = await searchUserById(idUser);

      if (!findUserById) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }

      const jornadas = await JornadaService.getAllJornadasByProject(project);

      res.status(201).json({
        message: "Obtener jornadas por proyectos exitoso",
        jornadas: jornadas,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async deleteJornada(req, res) {
    try {
      const jornadaId = parseInt(req.params.jornadaId);
      const jornada = await JornadaService.deleteJornada(jornadaId);
      if (!jornada)
        return res.status(400).json({ error: "Jornada no encontrada" });
      res.status(200).json({ message: "Jornada eliminada con éxito", jornada });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = JornadaController;
