// Obtener el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Función para cargar la sinopsis de la película
const cargarSipnosisPelicula = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
    if (respuesta.ok) {
      const movieDetails = await respuesta.json();

      const movieSummary = document.getElementById('movieSummary');
      movieSummary.textContent = movieDetails.overview;
    } else {
      console.log('No se pudo cargar los detalles de la película.');
    }
  } catch (error) {
    console.log(error);
  }
}

cargarSipnosisPelicula();