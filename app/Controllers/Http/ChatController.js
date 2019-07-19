'use strict'

const Chat = use ('App/Models/Chat');
const ChatUser= use ('App/Models/ChatUser')
class ChatController {

  async buscar({response,request}){
    let {emisor,remitente} = request.all();
    let chat;
    await Chat.find({'emisor': emisor.id,'remitentes': { $elemMatch: {id:remitente.id}}},(err,encontrado)=>{
        if( encontrado.length>0){
          chat = encontrado[0];
        } else{
          chat =  this.nuevoChat(emisor,remitente);
        }

      });

    return response.status(200).json({chat});
  }
    async nuevoChat(emisor,remitente){
      let chat = new Chat();
      chat.emisor = emisor.id;
      chat.remitentes.push({id:remitente.id, nickname:remitente.nickname})
      await chat.save();
    }
   async historial({response,request}){
        await ChatUser.find({'chatUser': chat._id},(err,datos)=>{
          if(datos.length>0){
            mensajes=datos;
          }
          else{
            mensajes= null;
          }
      });
      return response.status(200).json({mensaje})
    }
   async guardarMensaje({response,request}){
    var {idChat,mensaje}= request.all();
    var guardado;
    await ChatUser.update({'chatUser':idChat},{$push: {mensaje:mensaje} } ,
    { upsert : true });

    return response.status(200).json({msg: 'funcionó'});
  }

}

module.exports = ChatController
