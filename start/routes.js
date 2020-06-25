'use strict'

const Route = use('Route')

Route.get('files/:id', 'FileController.show')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'PasswordRecoveryController.store')

Route.put('passwords', 'PasswordRecoveryController.update')

Route.group(() => {
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.post('files', 'FileController.store')
}).middleware(['auth'])
