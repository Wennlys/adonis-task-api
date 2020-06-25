'use strict'

const Route = use('Route')

Route.get('files/:id', 'FileController.show')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'PasswordRecoveryController.store')

Route.put('passwords', 'PasswordRecoveryController.update')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.resource('projects.tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
