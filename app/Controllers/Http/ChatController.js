'use strict'

const Chat = use ('App/Models/Chat');
class ChatController {
  async guardar({response,request}){
    var {id,mensaje,tipo} = request.all();
    let chat = new Chat({usuarios:{id},mensaje:{mensaje,tipo}});
      await chat.save();
      return response.status(200).json({msg:'chat guardado', chat})
  }
  async ver({response}){
    let chats = await Chat.find({});
    response.status(200).json({msg:'sus chats',chats})
  }

  async buscar({response,request}){
    let {emisor,remitente} = request.all();
    let chat="hola";
    await Chat.find({
        'emisor': emisor.id,
        'remitentes':{id:remitente.id}
      },(err,encontrado)=>{
        if( encontrado.length>0){
          chat = encontrado;
        } else{
        /*  chat = new Chat();
          chat.emisor = emisor.id;
          chat.remitentes.push({id:remitente.id, nickname:remitente.nickname})
          chat.save();
          console.log(chat._id);*/
          }
      });
    response.status(200).json({chat});
  }
}

module.exports = ChatController
