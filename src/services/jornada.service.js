

class JornadaService {

    static async createJornada(jornadaData){
        try{
            return await Jornada.create({...jornadaData});
        }catch(err){
            console.error('jornada.service ~~ Error al crear el jornada:', err);
            throw err;
        }
    }

}

module.exports = JornadaService;