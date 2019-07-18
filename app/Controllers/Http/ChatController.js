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
}

module.exports = ChatController
