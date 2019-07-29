'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('chat', ({ socket }) => {
  console.log('user joined with %s socket id', socket.id)
})


/*-------Ruta para contactos nuevos----------*/
Ws.channel('Contactos','UsuarioController');

/*-------Ruta para grupos nuevos-------------*/
Ws.channel('MisGrupos','UsuarioController');

//mensajes de un grupo
Ws.channel('grupo:*', 'GrupoController');

//mensaje normal a una persona
Ws.channel('mensaje:*','MensajeController')
