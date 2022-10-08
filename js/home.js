const btn = document.getElementById("btn");
const search = document.querySelector("#search");
const container = document.getElementById("containerSearch");

const filtrar = async(text) => {
    container.innerHTML = ""
    const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c42277c85a8a8f307d358420965071c&query=${text}&include_adult=false`);
    const datos = await respuesta.json();
    const moviesResults = datos.results

    container.classList.add("search-div");
    let peliculas = "";
    moviesResults.forEach(pelicula => {
        if (pelicula.poster_path && pelicula.backdrop_path) {
            peliculas += `
            <div id="${pelicula.id}" class="pelicula">
                <img class="pelicula-img" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>`
            container.innerHTML = peliculas;
        }
    });
    const movies = document.getElementsByClassName('pelicula');
    for (let i = 0; i < movies.length; i++) {
        movies[i].addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('id');
            getInfo("movie", id);
        })
    }
    if (container.innerHTML === "") {
        container.innerHTML = `
        <p>No se encontraron resultados</p>`
    }
    if(search.value === ""){
        container.classList.remove("search-div");
        container.innerHTML = "";
    }
}

search.addEventListener("keydown", () => {
    if(search.value !== ""){
        filtrar(search.value);
    }
});

// Transicion de Lupa
const searchInput = document.getElementById('searchInput');

btn.addEventListener("click", () => {
    if (!searchInput.classList.contains('searchInput')) {
        searchInput.classList.add('searchInput');
        search.style.width = '100%'
    } else {
        searchInput.classList.remove('searchInput');
        search.style.width = '0'
    }
});

window.addEventListener('click', function(e){
    if (!searchInput.contains(e.target)){
        searchInput.classList.remove('searchInput');
        search.style.width = '0'
    }
})
