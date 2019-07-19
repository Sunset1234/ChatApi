'use strict'

class GrupoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log("HOLA ESTAMOS EN EL SOCKET PARGUELÓN");
  }
}

module.exports = GrupoController
