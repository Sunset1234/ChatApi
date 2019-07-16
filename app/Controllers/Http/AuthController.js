'use strict'

const User = use('App/Models/User');
var jwt = require('jsonwebtoken');
const DB = use('Database');

class AuthController {
    async registro({request, response}) {
        var { username, email, password} = request.all();

        try {
            let usuario = await User.create({
                username: username,
                email: email,
                password: password
            });

            return response.status(201).json({msg: 'Registro exitoso', usuario: usuario});
        } catch (error) {
            console.log(error);
            return response.status(400).json({msg: 'Error al registrar'});
        }
    }

    async login ({ request, auth, response }) {
        const { username, password } = request.all();

        await auth.attempt(username, password);
        
        let token = await this.crearToken(username);
        // let jugador = await DB.select('id', 'nickname', 'es_admin').from('users').where('nickname', nickname).first();
        let user = await DB.select('id').from('users').where('username', username).first();

        return response.status(200).json({
            token: token, 
            user: user.id,
            // nick: jugador.nickname,
            // tipo :jugador.es_admin
        });
    }

    async crearToken(username) {
        const user = await User.query().where('username', '=', username).fetch();
        var token = jwt.sign({user}, 'LAMEv1');

        return token;
    }

    // async verificarToken({request, response}) {
    //     const cabecera = request.header('autorizacion');

    //     console.log(cabecera);

    //     if (typeof cabecera !== 'undefined') {
    //         var split = cabecera.split(" ");
    //         request.token = split[0];
    //     } else {
    //         return false;
    //     }

    //     try {
    //         var p = jwt.verify(request.token, "LAMEv1");

    //         return p.hasOwnProperty('jugador');
    //     } catch(err) {
    //         return false;
    //     }
    // }
}

module.exports = AuthController
