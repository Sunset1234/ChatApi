'use strict'

const UserChat = use('App/Models/User_Chat');

class PruebaController {

    async prueba ({ request, view, response, auth }) {
        var kek = await UserChat.find();
        console.log(kek)
        return kek;
    }

}

module.exports = PruebaController
