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

/* 
  DOCUMNTACIÓN MONGOOSE
  https://mongoosejs.com/docs/queries.html
*/

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/convo', 'PruebaController.prueba');

Route.resource('grupos', 'GrupoController');
Route.put('/join', 'GrupoController.unirseOAbandonar');