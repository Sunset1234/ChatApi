'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InfoUser extends Model {

    static get hidden () {
        return ['id', 'user_id']
    }

    //The field name to be used for setting the time stamp. You can return null to disable it.
    static get createdAtColumn () { return null; }
    static get updatedAtColumn () { return null; }
}

module.exports = InfoUser
