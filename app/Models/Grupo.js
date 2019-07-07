'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Grupo extends Model {
    //relacion usuarios
    usuarios() {
        return this.belongsToMany('App/Models/User')
                   .pivotTable('grupo_users');
    }
      
    static get hidden () {
        return ['updated_at', 'baja']
    }
}

module.exports = Grupo
