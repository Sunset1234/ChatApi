'use strict'

const ChatGrupo = use ('App/Models/GrupoChat');
const User = use ('App/Models/User');
const Ws = use('Ws');
class GrupoChatController {

    async store ({ response, request }) {
        var { grupo_id, emisor_id, mensaje, tipo } = request.all();
        console.log("ENVIAMOS DATOS CHINGADO")
        //estaría mejor sacar el nombre con la mierda del Auth no?

        console.log(request.all());
        var emisor_nombre = await User.find(emisor_id);
        emisor_nombre = emisor_nombre.nickname;

        let chat = new ChatGrupo({
            grupo: grupo_id,
            mensaje: {
                emisor_id,
                emisor_nombre,
                mensaje,
                tipo
            }
        });
        
        await chat.save();

        var channel = Ws.getChannel('grupo:*');
        var topic = channel.topic('grupo:' + grupo_id);
        topic.broadcast('mensaje', {emisor_nombre, mensaje});

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
