const SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM5', {
  baudRate: 9600
});

const parser = port.pipe(new Readline({delimiter: '\r\n'}));

/*var five = require("johnny-five");
var board = new five.Board();
*/

let jugando = 'jugando';

module.exports = function (io){
	io.on('connection', (cliente) => {
		
		console.log('Cliente conectado');

		parser.on('data', (data) =>{
			console.log(data);
			if(data == "jugando"){
				jugando = data;
			}
			else if(data == "noJugando"){
				jugando = data;
			}
			else if(data == "ledRojo"){
				io.emit("ledRojo");
			}
			else if(data == "ledAzul"){
				io.emit("ledAzul")
			}
			else if(data == "ledVerde"){
				io.emit("ledVerde");
			}
			else if(data == "ledAmarillo"){
				io.emit("ledAmarillo");
			}
			else if(data == "bRojo"){
				io.emit("bRojo");
			}
			else if(data == "bAzul"){
				io.emit("bAzul")
			}
			else if(data == "bVerde"){
				io.emit("bVerde");
			}
			else if(data == "bAmarillo"){
				io.emit("bAmarillo");
			}
			else if(Number.isInteger(data)){
				io.emit("puntaje", data);
			}
			io.emit('ver', data);
		});

		cliente.on("cambiarEstado", (data) => {
			if(data == 'apagar' && jugando == "noJugando"){
				parser.write(data);
			}
			else if(data == 'encender'){
				parser.write(data);
			}
		});

		cliente.on("disconnect", data => {
			console.log("Cliente Desconectado: " + cliente.request.connection.remoteAddress);
			console.log("Motivo: " + data);
		});

	});


};