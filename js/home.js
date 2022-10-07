const peliculas = [
    {
        nombre: "Goodfellas" ,
        año: 1990 ,
        genero: "Crimen" ,
        director: "Martin Scorsese" ,
        img: "../img/goodfellas.jpg"
    },
    {
        nombre: "Taxi Driver" ,
        año: 1976 ,
        genero: "Drama" ,
        director: "Martin Scorsese" ,
        img: "../img/taxi-driver.jpg"
    },
    {
        nombre: "The Wolf of Wall Street" ,
        año: 2013 ,
        genero: "Comedia" ,
        director: "Martin Scorsese" ,
        img: "../img/the-wolf-of-wall-street.jpg"
    },
    {
        nombre: "The Irishman" ,
        año: 2019 ,
        genero: "Drama" ,
        director: "Martin Scorsese" ,
        img: "../img/the-irishman.jpg"
    },
    {
        nombre: "Pulp Fiction" ,
        año: 1994 ,
        genero: "Crimen" ,
        director: "Quentin Tarantino" ,
        img: "../img/pulp-fiction.jpg"
    },
    {
        nombre: "Once Upon a Time in Hollywood" ,
        año: 2019 ,
        genero: "Drama" ,
        director: "Quentin Tarantino" ,
        img: "../img/once-upon-a-time.jpg"
    },
    {
        nombre: "Inglourious Basterds" ,
        año: 2009 ,
        genero: "Acción" ,
        director: "Quentin Tarantino" ,
        img: "../img/inglourious-basterds.jpg"
    },
    {
        nombre: "Kill Bill: Vol. 1" ,
        año: 2003 ,
        genero: "Acción" ,
        director: "Quentin Tarantino" ,
        img: "../img/kill-bill1.jpg"
    },
    {
        nombre: "Kill Bill: Vol. 2" ,
        año: 2004 ,
        genero: "Acción" ,
        director: "Quentin Tarantino" ,
        img: "../img/kill-bill2.jpg"
    }
]

const btn = document.getElementById("btn");
const search = document.querySelector("#search");
const container = document.getElementById("containerSearch");

const filtrar = () => {
    container.innerHTML = ""
    const texto = search.value.toLowerCase();

    for(pelicula of peliculas){
        let nombre = pelicula.nombre.toLowerCase();
        let director = pelicula.director.toLowerCase();
        let genero = pelicula.genero.toLowerCase();

        if(nombre.includes(texto) || director.includes(texto) || genero.includes(texto)){
            container.classList.add("search-div");
            const div = document.createElement("div");
            div.classList.add("pelicula");
            div.innerHTML = `
            <img class="pelicula-img" src="${pelicula.img}" alt="${pelicula.nombre}">
            `
            container.append(div);
        }
    }
    if (container.innerHTML === "") {
        container.innerHTML = `
        <p>No se encontraron resultados</p>`
    }
    if(search.value === ""){
        container.classList.remove("search-div");
        container.innerHTML = ""
    }
}

search.addEventListener("keyup", () => {
    filtrar();
});

// Transicion de Lupa
const searchInput = document.getElementById('searchInput');

btn.addEventListener("click", (e) => {
    console.log(e)
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