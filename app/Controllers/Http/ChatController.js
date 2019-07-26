'use strict'

const Chat = use ('App/Models/Chat');
const ChatUser= use ('App/Models/ChatUser')
const User = use('App/Models/User');
const Grupo = use('App/Models/Grupo');
const GrupoUser = use('App/Models/GrupoUser');
const Database = use('Database')

class ChatController {

  async buscar({response,request}){
    let {emisor,remitente} = request.all();
    var chat;
    chat = await this.busca_grupo(emisor,remitente);
    console.log(chat.length);
    if(chat.length==0){
      console.log('no existe esta baina')
    chat = await this.nuevoChat(emisor,remitente)
    }
    return response.status(201).json({grupo: chat});
  }
    async busca_grupo(emisor,remitente){

      var seleccionados;
      var encontrado= await Database.select('*').from('grupo_users').innerJoin('grupos','grupos.id','grupo_users.grupo_id')
      .whereIn('user_id',[emisor.id,remitente.id])
      .andWhere('grupos.tipo','personal')
      .andWhere('grupos.nombre_grupo',emisor.nickname+' '+remitente.nickname);

      encontrado.forEach(element => {
        console.log(element)

      });

      return encontrado;
    }
    async nuevoChat(emisor,remitente){
      console.log(remitente);
      const grupo =await Grupo.create({
        nombre_grupo: emisor.nickname+' '+ remitente.nickname,
        descripcion: 'personal',
        tipo: 'personal',
      });
      const emisores=await GrupoUser.create({
        grupo_id: grupo.id,
        user_id: emisor.id
      });
      const remitentes=await GrupoUser.create({
        grupo_id: grupo.id,
        user_id: remitente.id
      });
      return grupo;
    };

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
