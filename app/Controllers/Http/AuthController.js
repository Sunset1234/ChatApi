'use strict'

const User = use('App/Models/User');

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
}

module.exports = AuthController
