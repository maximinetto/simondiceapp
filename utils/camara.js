
var fs = require('fs'),
    request = require('request'),
    parse = require('node-html-parser');



const url = "http://a857d138796ee05afcc1fa8a83c26750.jesusguibert.com:17171/jpg/image.jpg";
const usuario = "iscequipo2";
const password = usuario;



module.exports = {
    getImage: function(callback){
        var respuesta;
        var download = function(url, filename, callback){
            respuesta = request.get(url, {
                'auth': {
                'user': usuario,
                'pass': password,
                'sendImmediately': false
                }
            }, function(err, res, body){
                
                if(!err && res.statusCode == 200){
                    console.log("Imagen guardada!");
                }
                else{
                    console.log("Error" + err);
                }
                callback();
            }).pipe(fs.createWriteStream(filename));

        };
        
        download(url, './public/images/camara.jpg', function(){
            console.log('done');
            callback();
        });
        
    }
};
