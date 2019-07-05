'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoUserSchema extends Schema {
  up () {
    this.create('grupo_users', (table) => {
      table.increments()
      table.integer('grupo_id').unsigned().references('id').inTable('grupos')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('grupo_users')
  }
}

module.exports = GrupoUserSchema
