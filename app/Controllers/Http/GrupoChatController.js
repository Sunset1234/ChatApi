'use strict'

const ChatGrupo = use ('App/Models/GrupoChat');

class GrupoChatController {

    async store ({ response, request }) {
        var { grupo_id, emisor_id, mensaje, tipo } = request.all();
        
        let chat = new ChatGrupo({
            grupo: grupo_id,
            mensaje: {
                emisor_id,
                mensaje,
                tipo
            }
        });
        
        await chat.save();

        return response.status(200).json({msg:'chat guardado de grupo', chat})
    }

    async show ({ request, response, params }) {
        var grupo_id = params.id;

        let chats = await ChatGrupo.find({
            grupo: grupo_id
        });

        response.status(200).json({msg:'sus chats', chats})
    }
}

module.exports = GrupoChatController
