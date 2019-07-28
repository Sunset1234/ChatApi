'use strict'

const Grupo = use ('App/Models/Grupo');
var grupos = [];



class GrupoController {

  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    // this.obtener();

    console.log("------------------------");
  }

  async obtener() {
    grupos = await Grupo.all();
    console.log(grupos.toJSON());

  }

  onEscribiendo(data) {

    if (grupos.length < 0) {
      grupos.push({
        grupo: data.grupo,
        escriben: []
      });

      grupos.find((grupo) => {
        if (grupo.grupo === data.grupo) {
          grupo.escriben.push(data.usuario);
        }
      });
    } else {
      //variable con la cual checaremos si un grupo ya existe
      var exists;
      
      grupos.find((grupo) => {  
        exists = (grupo.grupo === data.grupo ? true : false);
      });
      
      if (!exists) {
        grupos.push({
          grupo: data.grupo,
          escriben: []
        });
      
        grupos.find((grupo) => {
          if (grupo.grupo === data.grupo) {
            grupo.escriben.push(data.usuario);
          }
        });
      } else {
        grupos.find((grupo) => {
          if (grupo.grupo === data.grupo) {
            grupo.escriben.push(data.usuario);
          }
        });
      }//fin if exists para revisar si hay un grupo que se busca
    }

    var unique = [];
    grupos.find((grupo) => {
      if (grupo.grupo === data.grupo) {
        unique = grupo.escriben.filter(function(item, pos) {
          return grupo.escriben.indexOf(item) == pos;
        });
      }
    });
    console.log('LOS QUE ESCRIBEN');
    console.log(unique);
    this.socket.broadcast('escribiendo', unique);
  }

  onNotescribiendo(data) {
    var unique = [];

    grupos.find((grupo) => {
      if (grupo.grupo === data.grupo) {
        unique = grupo.escriben.filter(function(item, pos) {
          return item !== data.usuario;
        });
      };
    });

    grupos = unique;

    this.socket.broadcastToAll('notescribiendo', unique);
  }

  onMessage(message) {
    this.socket.broadcastToAll('message', message.usuario);
  }

  onAñadido(message){
    
  }
}

module.exports = GrupoController
