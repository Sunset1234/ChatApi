'use strict'

/** @type {import('@lucid-mongo/src/Schema')} */
const Schema = use('Schema')

class GrupoChatSchema extends Schema {
  up () {
    this.create('grupo_chats', (collection) => {
      collection.index('title_index', {title: 1})
    })
  }

  down () {
    this.drop('grupo_chats')
  }
}

module.exports = GrupoChatSchema
