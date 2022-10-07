// ---------------------- CREAR SECCION ----------------------
const crearSeccion = (title, nombre, num) => {
    const generalContainer = document.getElementById('generalContainer');
    const div = document.createElement('div');
    div.setAttribute('id', nombre);
    div.classList.add('movies');
    div.innerHTML = `
        <h1>${title}</h1>
        <div id="${nombre}Slider" class="slider responsive shadow"></div>
        <div id="prev${num}" class="arrow_prev">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 158.9 315.6" style="enable-background:new 0 0 158.9 315.6;" xml:space="preserve">
            <polygon points="118.5,315.6 158.9,285.4 63.2,157.8 158.9,30.2 118.5,0 0,157.8 "/>
            </svg>
        </div>
        <div id="next${num}" class="arrow_next">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 158.9 315.6" style="enable-background:new 0 0 158.9 315.6;" xml:space="preserve">
            <polygon points="40.3,0 0,30.2 95.7,157.8 0,285.4 40.3,315.6 158.9,157.8 "/>
            </svg>
        </div>
    `
    generalContainer.appendChild(div);
}


// ---------------------- LOGOS ----------------------
const getLogos = async(type, id) => {
    const logosID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/images?api_key=4c42277c85a8a8f307d358420965071c`);
    const movie = await logosID.json();
    const movieLogos = movie.logos;
    const logo = movieLogos.find(logo => logo.iso_639_1 == "en") || movieLogos.find(logo => logo.iso_639_1) || movieLogos.find(logo => logo.iso_639_1 == null);
    if (logo == undefined) {
        logo == []
    } else{
        return logo.file_path;
    }
    
}

// ---------------------- INFORMACION ----------------------
const bgInfo = document.getElementById('bgInfo');
const movieInfo = document.getElementById('movieInfo');

const getInfo = async(type, id) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`);
    const datos = await respuesta.json();
    logoURL = await getLogos(type, id);
    bgInfo.classList.add('bgInfo');
    movieInfo.classList.add('movieInfo');
    console.log(datos.overview);
    if (logoURL == undefined) {
        movieInfo.innerHTML = `
        <div class="imgInfo">
            <img class="backdrop" src="https://image.tmdb.org/t/p/original/${datos.backdrop_path}">
            <div class="shadowBack"></div>
        </div>
        `
    } else{
        movieInfo.innerHTML = `
        <div class="imgInfo">
            <img class="backdrop" src="https://image.tmdb.org/t/p/original/${datos.backdrop_path}">
            <div class="logoBtns">
                <div class="divLogo">
                    <img class="logo" src="https://image.tmdb.org/t/p/original/${logoURL}">
                </div>
                <button class="reproducir">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                    <span>Reproducir<span>
                </button>
                <button class="miLista">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="#fff"></path></svg>
                </button>
                <button class="rate">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="#fff"></path></svg>
                </button>
            </div>
            <div class="shadowBack"></div>
        </div>
        <div class="info">
            <div class="sipnosis">
                <p>${datos.overview}</p>
            </div>
        </div>
        `
    }
    
};


// ---------------------- CARGAR PELICULAS ----------------------

const cargarPeliculas = async(type, movies, movies2, title, nombre, num, container) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${movies}?api_key=4c42277c85a8a8f307d358420965071c&${movies2}`);
    const datos = await respuesta.json()

    crearSeccion(title, nombre, num);
    let peliculas = "";
    const moviesResults = datos.results;
    moviesResults.forEach(pelicula => {
        peliculas += `
        <div id="${pelicula.id}" class="card">
            <img class="cardImg" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        </div>`
        document.getElementById(container).innerHTML = peliculas;
    });
    
    // ---------- PEDIR INFO ----------

    $(`#${nombre}Slider`).on('click', '.card', function (e){
        const id = $(e.currentTarget).attr("id");
        getInfo(type, id)
    });

    window.addEventListener('click', function(e){
        if (!movieInfo.contains(e.target)){
            movieInfo.classList.remove('movieInfo');
            movieInfo.innerHTML = "";
            bgInfo.classList.remove('bgInfo')
        }
    });

    // ---------- CREAR CARROUSEL ----------
    $(`#${nombre}Slider`).slick({
        prevArrow: `#prev${num}`,
        nextArrow: `#next${num}`,
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: false,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                autoplay: false,
                }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: false,
                }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: false,
                }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: false,
                }
            }
        ]
    });
    $(`#${nombre}Slider`).slick('slickSetOption', 'slidesToScroll', 6, true);
}

cargarPeliculas("movie", "movie/now_playing", "page=2", "Agregados recientemente","latest", "1", "latestSlider");
cargarPeliculas("movie", "movie/popular", "", "Tendencias","trends", "2", "trendsSlider");
cargarPeliculas("tv", "discover/tv", "with_networks=213", "Series","series", "3", "seriesSlider");
cargarPeliculas("tv", "discover/tv", "with_genres=18&page=2", "Series dramáticas","tvDrama", "4", "tvDramaSlider");