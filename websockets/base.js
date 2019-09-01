const SerialPort = require('serialport');
const download = require('../utils/camara');
var Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM5', {
  baudRate: 9600
});

const parser = port.pipe(new Readline({delimiter: '\r\n'}));

const delay = (ms) => {
	const startPoint = new Date().getTime()
	while (new Date().getTime() - startPoint <= ms) {/* wait */}
}

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
			else if(data == "apagado" || data == "encendido"){
				if(data == "apagado")
					io.emit("estado", "Encender");
				else
					io.emit("estado", "Apagar");
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
				download.getImage();
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

		setInterval(prueba, 5000);

		cliente.on("disconnect", data => {
			console.log("Cliente Desconectado: " + cliente.request.connection.remoteAddress);
			console.log("Motivo: " + data);
		});

	});

	function prueba(){
		parser.emit("data", "jugando");
		setTimeout(() => {
			parser.emit("data", "ledAzul");
			setTimeout(() => {
				parser.emit("data", "ledVerde");
				setTimeout(() => {
					parser.emit("data", "ledAmarillo");
					setTimeout(() => {
						parser.emit("data", 4);
						setTimeout(() => {
							parser.emit("data", "ledAzul");
							setTimeout(() => {
								parser.emit("data", "ledVerde");
								setTimeout(() => {
									parser.emit("data", "ledAzul");
									setTimeout(() => {
										parser.emit("data", "ledVerde");
										setTimeout(() => {
											parser.emit("data", "ledRojo");
											setTimeout(() => {
												parser.emit("data", "ledRojo");
												setTimeout(() => {
													parser.emit("data", 5);
													setTimeout(() => {
														parser.emit("data", "ledVerde");
														setTimeout(() => {
															parser.emit("data", "ledAzul");
															setTimeout(() => {
																parser.emit("data", "ledVerde");
																setTimeout(() => {
																	parser.emit("data", "ledRojo");
																	setTimeout(() => {
																		parser.emit("data", "ledRojo");
																		setTimeout(() => {
																			parser.emit("data", "ledAmarillo");
																			setTimeout(() => {
																				parser.emit("data", "ledAmarillo");
																				setTimeout(() => {
																					parser.emit("data", 4);
																					setTimeout(() => {
																						parser.emit("data", "apagado");
																						setTimeout(() => {
																							parser.emit("data", "encendido");														
																							setTimeout(() => {
																								parser.emit("data", "noJugando");
																							},2000);
																						},2000);														
																					},2000);											
																				},2000);
																			},2000);
																		},2000);
																	},2000);
																},2000);
															},2000);
														},2000);
													},2000);
												},2000);
											},2000);
										},2000);
									},2000);
								},2000);
							},2000);
						},2000);
					},2000);
				},2000);
			},2000);
		},2000);		
	}
};