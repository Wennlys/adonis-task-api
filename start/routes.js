'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'PasswordRecoveryController.store')
Route.post('files', 'FileController.store')

Route.put('passwords', 'PasswordRecoveryController.update')
