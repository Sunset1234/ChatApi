'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AmigoSchema extends Schema {
  up () {
    this.create('amigos', (table) => {
      table.increments()
      table.integer('user_x_id').unsigned().references('id').inTable('users')
      table.integer('user_y_id').unsigned().references('id').inTable('users')
      table.string('relacion', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('amigos')
  }
}

module.exports = AmigoSchema
