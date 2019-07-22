'use strict'

const Chat = use ('App/Models/Chat');
const ChatUser= use ('App/Models/ChatUser')
class ChatController {

  async buscar({response,request}){
    let {emisor,remitente} = request.all();
    let chat;
    let mensaje;
    await Chat.find({'emisor': emisor.id,'remitentes': { $elemMatch: {id:remitente.id}}},(err,encontrado)=>{
        if( encontrado.length>0){
          chat = encontrado[0];
        } else{
          chat = this.nuevoChat(emisor,remitente);
        }

      });
      console.log(chat._id);
      mensaje= this.historial(chat._id);
    return response.status(200).json({chat, mensaje});
  }
    async nuevoChat(emisor,remitente){
      let chat = new Chat();
      chat.emisor = emisor.id;
      chat.remitentes.push({id:remitente.id, nickname:remitente.nickname})
      await chat.save();
      return chat;
    }
    async historial(idchat){
        await ChatUser.find({'chatUser': idchat},(err,datos)=>{
         return datos;
      });
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
