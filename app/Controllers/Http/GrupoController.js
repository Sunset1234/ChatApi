'use strict'

const User = use('App/Models/User');
const Grupo = use('App/Models/Grupo');
const GrupoUser = use('App/Models/GrupoUser');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with grupos
 */
class GrupoController {
  /**
   * Show a list of all grupos.
   * GET grupos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, params }) {
    //grupos para un usuario



  }

  /**
   * Create/save a new grupo.
   * POST grupos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    var { nombre_grupo,tipo, descripcion } = request.all();

    const grupo = await Grupo.create({
      nombre_grupo: nombre_grupo,
      tipo:tipo,
      descripcion: descripcion
    });

    return response.status(201).json({grupo: grupo});
  }

  /**
   * Display a single grupo.
   * GET grupos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const id = params.id;

    const detalles_grupo = await Grupo.query().where('id', id).with('usuarios').first();
    
    return response.status(200).json({grupo: detalles_grupo});
  }

    /**
   * Trae grupos de un usuario
   * GET grupos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async showAll ({ params, response }) {
    var grupos = await User.query().where('id', params.id).with('grupos').first();

    return response.status(200).json({grupos: grupos.toJSON().grupos});
  }

  /**
   * Update grupo details.
   * PUT or PATCH grupos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id;
    var { nombre_grupo, descripcion } = request.all();

    const grupo = await Grupo.find(id);
    grupo.nombre_grupo = nombre_grupo;
    grupo.descripcion = descripcion;

    await grupo.save();

    return response.status(201).json({msg: 'Grupo actualizado con éxito', grupo: grupo});
  }

  /**
   * Delete a grupo with id.
   * DELETE grupos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const id = params.id;

    //únicamente flag de baja para que en cliente no pueda escribir pero pueda ver historial
    const grupo = await Grupo.find(id);
    grupo.baja = true;

    await grupo.save();
    
    return response.status(200).json({msg: 'Grupo eliminado con éxito', grupo: grupo});
  }

  /**
   * Entrar a un grupo
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async unirseOAbandonar ({ request, response }) {
    var { user_id, grupo_id } = request.all();
    

    var status = null;

    var exists = await GrupoUser.query().where('user_id', '=', user_id)
                                        .where('grupo_id', '=', grupo_id)
                                        .first();

    //se crea la relación grupo-usuarios si no se tiene para estos id
    if (!exists) {
      const user_grupo = await GrupoUser.create({
        grupo_id: grupo_id,
        user_id: user_id
      });
      status = user_grupo.baja;
    } else {
      //si existe la relación se da de baja (Sale) si es falso o viceversa
      exists.baja = exists.baja ? false : true;
      exists.save();
      status = exists.baja;
    }

    return response.status(200).json({msg: 'Actualizado', status: status});
  }

}

module.exports = GrupoController
