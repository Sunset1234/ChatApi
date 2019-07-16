'use strict'

class GrupoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log("EN EL SOCKETIN")
  }

  onMessage(message) {
    console.log(message);
    // this.socket.broadcastToAll('message', message);
  }
}

module.exports = GrupoController
