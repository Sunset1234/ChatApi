'use strict'

/** @type {import('@lucid-mongo/src/Schema')} */
const Schema = use('Schema')

class UserChatSchema extends Schema {
  up () {
    this.create('user_chats', (collection) => {
      collection.index('title_index', {title: 1})
    })
  }

  down () {
    this.drop('user_chats')
  }
}

module.exports = UserChatSchema
