'use strict'

const mongoose = use('Mongoose')

let grupoChatSchema = mongoose.Schema({
    grupo: String,
    mensaje: [{emisor_id: String, mensaje: String, tipo: String}]
}, {
    timestamps: true
})

module.exports = mongoose.model('GrupoChat', grupoChatSchema)