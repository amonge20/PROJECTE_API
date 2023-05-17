const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

async function cargarValoracion(movieId) {
  const valoracionElement = document.querySelector(`[data-movie-id="${movieId}"].valoracion`);
  const valoracionContainer = document.querySelector(`[data-movie-id="${movieId}"].valoracionContainer`);

  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
    if (respuesta.ok) {
      const movieDetails = await respuesta.json();

      valoracionElement.innerHTML = `
        <a href="valoracion.html?valoracion=${movieDetails.vote_average}" target="_blank">Ver Valoración</a>
      `;

      // Crear el elemento canvas para la gráfica
      const canvas = document.createElement('canvas');
      canvas.setAttribute('id', `chart-${movieId}`);

      // Agregar el canvas al contenedor de valoración
      valoracionContainer.appendChild(canvas);

      // Obtener el contexto del canvas
      const ctx = canvas.getContext('2d');

      // Crear los datos de la gráfica
      const data = {
        labels: ['Valoración'],
        datasets: [
          {
            label: 'Puntuación',
            data: [movieDetails.vote_average],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };

      // Configurar opciones de la gráfica
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      };

      // Crear la gráfica de barras
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });
    } else {
      console.log('No se pudo cargar los detalles de la película.');
    }
  } catch (error) {
    console.log(error);
  }
}

mostrarValoracion(movieId);
cargarValoracionPelicula();