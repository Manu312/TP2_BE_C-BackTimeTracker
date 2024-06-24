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
      //Esto seria una manera no? Sino le podemos poner un middleware en la ruta con la funcion "validateUserautenticated"
      const jornadaData = {
        fechaInicio: req.body.fechaInicio,
        fechaCierre: req.body.fechaCierre,
        hoursWorked: req.body.hoursWorked,
        price: req.body.price,
        projectId: parseInt(req.body.idProject),
      };
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
