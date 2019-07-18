'use strict'

const User = use('App/Models/User');
var jwt = require('jsonwebtoken');
const DB = use('Database');

class AuthController {

    async Registro({request, response}) {
        var { nickname, password} = request.all();

        try {
            let usuario = await User.create({
                nickname: nickname,
                password: password
            });

            return response.status(201).json({msg: 'Registro exitoso', usuario: usuario});
        } catch (error) {
            console.log(error);
            return response.status(400).json({msg: 'Error al registrar'});
        }
    }

    async Login ({ request, auth, response }) {
        const { nickname, password } = request.all();

        await auth.attempt(nickname, password);

        let token = await this.CrearToken(nickname);

        let jugador = await DB.select('id', 'nickname').from('users').where('nickname', nickname).first();

        return response.status(200).json({
            token: token, 
            jugador: jugador.id,
            nick: jugador.nickname
        });
    }

    async CrearToken(nickname) {
        const jugador = await User.query().where('nickname', '=', nickname).fetch();
        var token = jwt.sign({jugador}, 'LAMEv1');

        return token;
    }

}

module.exports = AuthController
