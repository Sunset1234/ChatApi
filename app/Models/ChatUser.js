
'use strict'

const mongoose = use('Mongoose')

let userSchema = mongoose.Schema({
  chatUser: {type: Schema.Types.ObjectId, ref: 'Chat'},
  mensaje: [{ mensaje:String,tipo:String}]
}, {
  timestamps: true
})

module.exports = mongoose.model('ChatUser', userSchema)
