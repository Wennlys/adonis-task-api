'use strict'

const Route = use('Route')

Route.get('files/:id', 'FileController.show')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'PasswordRecoveryController.store').validator('ForgotPassword')

Route.put('passwords', 'PasswordRecoveryController.update').validator('ResetPassword')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map([[['projects.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map([[['projects.taks.store'], ['Task']]]))
}).middleware(['auth'])
