'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdressSchema extends Schema {
  up () {
    this.create('user_adresses', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_adresses')
  }
}

module.exports = UserAdressSchema
