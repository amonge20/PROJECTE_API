let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();

$(document).ready(function() {
	// Manejo del evento de envío del formulario
	$("#movieForm").submit(function(event) {
	  event.preventDefault();
	  var movieId = $("#movieId").val();

	  // Realiza una solicitud a tu API para obtener el resumen de la película
	  $.ajax({
		url: "/api/movies/" + movieId, // Reemplaza esta URL con la ruta de tu API
		method: "GET",
		success: function(response) {
		  // Muestra el resumen de la película en el contenedor correspondiente
		  $("#movieSummary").html(response.summary);
		},
		error: function() {
		  // Manejo del error en caso de que la solicitud falle
		  $("#movieSummary").html("No se pudo cargar el resumen de la película.");
		}
	  });
	});
  });