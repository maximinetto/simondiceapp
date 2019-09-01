function leer(){
	var socket = io();
	
	leerLeds();

	leerPuntaje();

	eventoButton();


	function eventoButton(){
		let cambiarEstado = document.getElementById('cambiarEstado');
		cambiarEstado.addEventListener("click", () => {
			let data = cambiarEstado.textContent.toLowerCase;
			socket.emit("cambiarEstado", data);
			socket.on("estado", data => {
				cambiarEstado.textContent = data;
			})
		});
	}

	function leerPuntaje() {
		let puntajeMaximo = document.getElementById('puntajeMaximo');
		socket.on('puntaje', dato => {
			console.log(dato);
			let previousScore = Number.parseInt(puntajeMaximo.textContent, 10);
			let currentScore = Number.parseInt(dato, 10);
			if(previousScore < currentScore){
				puntajeMaximo.textContent = currentScore;
				takePhoto();
			}
		});
	}

	function leerLeds(){
		let ledRojo = document.getElementById('lRojo');
		let ledAzul = document.getElementById('lAzul');
		let ledVerde = document.getElementById('lVerde');
		let ledAmarillo = document.getElementById('lAmarillo');
	
		socket.on('ledRojo', () => {
			let colorAnterior = "#fd4a4a";
			ledRojo.style.backgroundColor = 'red';
			setTimeout(() => {
				ledRojo.style.backgroundColor = colorAnterior;
			}, 2000);
			
		});
		socket.on('ledAzul', () => {
			let colorAnterior = "#4b4bf7";
			ledAzul.style.backgroundColor = 'blue';
			setTimeout(() => {
				ledAzul.style.backgroundColor = colorAnterior;
			},2000);	
		});
		socket.on('ledVerde', () => {
			let colorAnterior = "#5fd85f";
			ledVerde.style.backgroundColor = 'green';
			setTimeout(() => {
				ledVerde.style.backgroundColor = colorAnterior;
			},2000);
			
		});
		socket.on('ledAmarillo', () => {
			let colorAnterior = "#e4e495";
			ledAmarillo.style.backgroundColor = 'yellow';
			setTimeout(() => {
				ledAmarillo.style.backgroundColor = colorAnterior;
			}, 2000);
		});
	}

	function takePhoto(){

	}
}



window.onload = leer;