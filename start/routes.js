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

Route.post('/users', 'UserController.create');
Route.post('/sessions', 'SessionController.create');

//Helper que utiliza para não criar uma rota para cada método
Route.resource('properties', 'PropertyController')
  //apiOnly - Garante que as rotas CREATE e EDIT (deletadas) não tenham rotas
  .apiOnly()
  //middleware - Garante que usuários não autenticados não possam utilizar essa rota
  .middleware('auth')
