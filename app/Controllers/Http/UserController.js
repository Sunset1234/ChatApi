'use strict'

const InfoUser = use('App/Models/InfoUser');

class UserController {
    async guardarInfo ({params, request, response}) {
        var { nombres, apellidos } = request.all();
        const user_id = params.id;

        let info = await InfoUser.create({
            nombres: nombres,
            apellidos: apellidos,
            user_id: user_id
        });

        return response.status(201).json({msg: 'Información actualizada con éxito', info: info});
    }
    
    async updateInfo ({params, request, response}) {
        var { nombres, apellidos } = request.all();
        const user_id = params.id;

        let info = await InfoUser.query().where('user_id', '=', user_id).first();
        info.nombres = nombres;
        info.apellidos = apellidos;
        info.save();

        return response.status(200).json({msg: 'Información actualizada con éxito', info: info});
    }
}

module.exports = UserController
