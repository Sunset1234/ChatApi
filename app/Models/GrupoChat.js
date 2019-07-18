'use strict'

const mongoose = use('Mongoose')

let grupoChatSchema = mongoose.Schema({
    grupo: String,
    mensaje: [{emisor_id: String, emisor_nombre: String, mensaje: String, tipo: String}]
}, {
    timestamps: true
})

module.exports = mongoose.model('GrupoChat', grupoChatSchema)