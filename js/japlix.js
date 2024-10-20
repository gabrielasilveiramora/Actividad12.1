let movies = [];

// Cargar datos de películas al iniciar la página
window.onload = async () => {
  const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
  movies = await response.json(); // Guardar películas
};

// Filtrar películas al hacer click en "Buscar"
document.getElementById('btnBuscar').addEventListener('click', () => {
  const searchTerm = document.getElementById('inputBuscar').value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.genres.join(', ').toLowerCase().includes(searchTerm) ||
    (movie.tagline && movie.tagline.toLowerCase().includes(searchTerm)) ||
    movie.overview.toLowerCase().includes(searchTerm)
  );

  mostrarPeliculas(filteredMovies);
});

// Mostrar el listado de películas filtradas
function mostrarPeliculas(peliculas) {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // Limpiar lista
  peliculas.forEach(pelicula => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'bg-dark', 'text-white');
    li.innerHTML = `
      <h5>${pelicula.title}</h5>
      <p>${pelicula.tagline}</p>
      <p>${renderEstrellas(pelicula.vote_average)}</p>
    `;
    li.addEventListener('click', () => mostrarDetallePelicula(pelicula));
    lista.appendChild(li);
  });
}

// Mostrar el detalle de la película seleccionada
function mostrarDetallePelicula(pelicula) {
  document.getElementById('tituloPelicula').textContent = pelicula.title;
  document.getElementById('overviewPelicula').textContent = pelicula.overview;
  document.getElementById('generosPelicula').innerHTML = pelicula.genres.map(genero => `<li>${genero}</li>`).join('');
  
  // Detalles del desplegable
  document.getElementById('releaseYear').textContent = `Año: ${pelicula.release_date.split('-')[0]}`;
  document.getElementById('duration').textContent = `Duración: ${pelicula.runtime} minutos`;
  document.getElementById('budget').textContent = `Presupuesto: $${pelicula.budget}`;
  document.getElementById('revenue').textContent = `Ganancias: $${pelicula.revenue}`;

  document.getElementById('detallePelicula').style.display = 'block'; // Mostrar contenedor
}

  // Estrellas
function renderEstrellas(voteAverage) {
    const stars = Math.round(voteAverage / 2); // Escala de 5 estrellas
    return `<span class="text-warning">${'★'.repeat(stars)}</span><span class="text-muted">${'☆'.repeat(5 - stars)}</span>`;
  }