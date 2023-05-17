let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

function mostrarSipnosis(movieId) {
    window.location.href = `sipnosis.html?movieId=${movieId}`;
  }

  const valoracionContainer = document.getElementById('valoracionContainer');

  async function mostrarValoracion(movieId) {
    const valoracionElement = document.querySelector(`[data-movie-id="${movieId}"].valoracion`);
    const valoracionContainer = document.querySelector(`[data-movie-id="${movieId}"].valoracionContainer`);
  
    try {
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
      if (respuesta.ok) {
        const movieDetails = await respuesta.json();
  
        valoracionElement.textContent = `Valoración: ${movieDetails.vote_average}`;
        valoracionElement.style.display = 'block';
  
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
  
        // Crear la gráfica
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
  

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

    console.log(respuesta);

    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = '';
      datos.results.forEach(pelicula => {
        peliculas += `
		<div class="pelicula">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
			<h3 class="titulo" data-movie-id="${pelicula.id}">${pelicula.title}</h3>
			<button class="btn-sinopsis" data-movie-id="${pelicula.id}" onclick="mostrarSipnosis(${pelicula.id})">Mostrar Sinopsis</button>
			<button class="btn-valoracion" data-movie-id="${pelicula.id}" onclick="mostrarValoracion(${pelicula.id})">Mostrar Valoración</button>
			<p class="sinopsis" data-movie-id="${pelicula.id}" style="display: none;"></p>
			<p class="valoracion" data-movie-id="${pelicula.id}" style="display: none;"></p>
      <div id="valoracionContainer"></div>
		</div>
        `;
      });

      document.getElementById('contenedor').innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log('Pusiste la llave mal');
    } else if (respuesta.status === 404) {
      console.log('La película que buscas no existe');
    } else {
      console.log('Hubo un error y no sabemos qué pasó');
    }
  } catch (error) {
    console.log(error);
  }
}

async function mostrarValoracion(movieId) {
  const valoracionElement = document.querySelector(`[data-movie-id="${movieId}"].valoracion`);

  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
    if (respuesta.ok) {
      const movieDetails = await respuesta.json();

      valoracionElement.textContent = `Valoración: ${movieDetails.vote_average}`;
      valoracionElement.style.display = 'block';
    } else {
      console.log('No se pudo cargar los detalles de la película.');
    }
  } catch (error) {
    console.log(error);
  }
}

async function mostrarSinopsis(movieId) {
  const sinopsisElement = document.querySelector(`[data-movie-id="${movieId}"].sinopsis`);

  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
    if (respuesta.ok) {
      const movieDetails = await respuesta.json();

      sinopsisElement.textContent = movieDetails.overview;
      sinopsisElement.style.display = 'block';
    } else {
      console.log('No se pudo cargar los detalles de la película.');
    }
  } catch (error) {
    console.log(error);
  }
}

cargarPeliculas();