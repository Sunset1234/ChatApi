'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfoUserSchema extends Schema {
  up () {
    this.create('info_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').unique()
      table.string('nombres', 254)
      table.string('apellidos', 254)
    })
  }

  down () {
    this.drop('info_users')
  }
}

module.exports = InfoUserSchema
