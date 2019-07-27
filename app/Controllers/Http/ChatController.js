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
    var existente;
    chat = await this.busca_grupo(emisor,remitente);
    //foreach para buscar si se encuentran los dos usuarios en un grupo
    chat.rows.forEach(element => {
      //busca si hay dos usuarios por grupo
      if (element.$relations.usuarios.rows.length==2){
        existente=element
      }
    });
    //sino existe el elemento lo crea
    if(!existente){
    existente = await this.nuevoChat(emisor,remitente)
    }
    return response.status(201).json({grupo: existente});
  }
    async busca_grupo(emisor,remitente){
    // busca todos los grupos con tipo personal
      var encontrado;
      encontrado= await Grupo.query().where('tipo','personal').with('usuarios',(usuario)=>{
        //busca si existen los dos ids en el grupo, sino existen manda uno o manda null
        usuario.whereIn('users.id',[emisor.id,remitente.id])
      }).fetch()
      return encontrado;
    }
    //crea la conversación para las personas
    async nuevoChat(emisor,remitente){
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
