const JornadaService = require('../services/jornada.service');

class JornadaController {

    static async createJornada(req, res) {
        try {
            const jornadaData = {
                fechaInicio: req.body.fechaInicio,
                fechaCierre: req.body.fechaCierre,
                hoursWorked: req.body.hoursWorked,
                price: req.body.price,
                projectId: parseInt(req.body.projectId)
            };
            const jornada = await JornadaService.createJornada(jornadaData);
            if(!jornada) return res.status(400).json({ error: 'No se pudo crear la jornada' });
            res.status(201).json({ message: 'Jornada creada con éxito', jornada });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

module.exports = JornadaController;