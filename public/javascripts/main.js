function leer(){
	var socket = io();
	let span = document.getElementById('mostrar');

	socket.on('ver', dato => {
		console.log(dato);
		span.innerHTML = 'Dato: ' + dato;
	});
}

window.onload = leer;