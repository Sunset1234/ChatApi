'use strict'

const mongoose = use('Mongoose')

let userSchema = mongoose.Schema({
  emisor: String,
  remitentes:[{id:String}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', userSchema)

