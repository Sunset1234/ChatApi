'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class User_Chat
 */
class User_Chat extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'User_ChatHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * User_Chat's schema
   */
  static get schema () {
    return {

    }
  }
}

module.exports = User_Chat.buildModel('User_Chat')
