'use strict'

class MensajeController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onSeleccion(emisor,remitente){
    var resultado= this.buscar(emisor,remitente);
    this.socket.broadcastToAll('selección',resultado);
  }
  async buscar(emisor,remitente){
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
     return {chat,mensaje};
   }
   async historial(idchat){
     await ChatUser.find({'chatUser': idchat},(err,datos)=>{
      return datos;
   });
  }
}

module.exports = MensajeController
