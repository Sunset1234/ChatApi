'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User');

/*
  DOCUMNTACIÓN MONGOOSE
  https://mongoosejs.com/docs/queries.html
*/

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.post('/Registro', 'AuthController.Registro');
Route.post('/Login', 'AuthController.Login');

Route.get('/convo', 'PruebaController.prueba');

Route.resource('grupos', 'GrupoController');
Route.put('/join', 'GrupoController.unirseOAbandonar');

Route.get('/gruposu/:id', 'GrupoController.showAll');

Route.post('/info/:id', 'UserController.guardarInfo');
Route.put('/info/:id', 'UserController.updateInfo');

/**
 * rutas con mongo
*/
Route.get('/chat','ChatController.ver');
Route.post('/chat','ChatController.guardar');

Route.post('/chats','ChatController.buscar');

Route.get('/grupo/:id','GrupoChatController.show');
Route.post('/grupopost','GrupoChatController.store');
/*-----------------VER USUARIOS-------------------*/
Route.post('/GetUsuarios','UserController.GetUsuarios');
