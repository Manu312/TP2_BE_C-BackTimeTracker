const JornadaService = require("../services/jornada.service");
const { searchUserWithToken } = require("../utils/common");
const {verifyToken} = require("../utils/jwt");

class JornadaController {
  static async createJornada(req, res) {
    try {
      //@TODO AUGUSTO: FALTA VALIDAR EL TOKEN. MIDDLEWARE!

      const token = req.headers.authorization.split(" ")[1];
      const findUserById = await searchUserWithToken(token);
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
      res
        .status(201)
        .json({
          message: "Jornada creada con éxito",
          jornada,
          username: "augusto",
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllJornadasByProject(req, res) {
    try {
      //@TODO AUGUSTO: HECHO. MIDDLEWARE!
      const token = req.headers.authorization.split(" ")[1];
      const project = Number(req.params.idProject);

      console.log("PROJECT", project);
      const findUserById = await searchUserWithToken(token);

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
    try{
        const jornadaId = parseInt(req.params.jornadaId);
        const jornada = await JornadaService.deleteJornada(jornadaId);
        if(!jornada) return res.status(400).json({error: "Jornada no encontrada"});
        res.status(200).json({message: "Jornada eliminada con éxito", jornada});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
  }
}

module.exports = JornadaController;
