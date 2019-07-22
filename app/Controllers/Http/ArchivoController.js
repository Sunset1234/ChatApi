'use strict'
const Helpers = use("Helpers");

class ArchivoController {
    async archivos({ request, response  }) {
       const file = request.file('file', {
         
         types: ['jpg','jpeg','png', 'gif','svg','mp4','mp3','avi','wmv','mov','mpeg'],
         size: '1024mb'
       })
   
        
    const fileName = `${new Date().getTime()}.${file.subtype}`
      
       file.move(Helpers.publicPath('/assets/archivos/'), {
         name: `${new Date().getTime()}.${file.subtype}`
       })
       console.log('/assets/archivos/'+fileName);
      return response.status(200).json({url:'/assets/archivos/'+fileName})

   }

}

module.exports = ArchivoController
