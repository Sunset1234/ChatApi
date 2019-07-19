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
Route.get('/Verificar','AuthController.VerificarToken')

Route.get('/convo', 'PruebaController.prueba');

Route.resource('grupos', 'GrupoController');
Route.put('/join', 'GrupoController.unirseOAbandonar');



Route.post('/info/:id', 'UserController.guardarInfo');
Route.put('/info/:id', 'UserController.updateInfo');


Route.get('/user/:id', async ({params, request, response}) => {

  var kek = await User.query().where('id', params.id).with('grupos').with('detalles').first();

  return response.status(200).json({user: kek});
})

/**
 * rutas con mongo
*/
Route.get('/chat','ChatController.ver');
Route.post('/chat','ChatController.guardar');

/*-----------------VER USUARIOS-------------------*/
Route.post('/GetUsuarios/:id','UserController.GetUsuarios');
