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


// ---------------------- CREDITS ----------------------
const getCredits = async(type, id) => {
    const creditsID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/credits?api_key=4c42277c85a8a8f307d358420965071c`);
    const movie = await creditsID.json();
    const credits = movie.cast;
    const names = credits.map(person => person.name);
    const cast = names.slice(0, 4).join(", ");
    return cast;
}

// ---------------------- CREATORS ----------------------
const getCreators = async(type, id) => {
    const creditsID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/credits?api_key=4c42277c85a8a8f307d358420965071c`);
    const movie = await creditsID.json();
    const credits = movie.crew;
    const names = credits.map(person => person.name);
    const creators = names.slice(0, 2).join(", ");
    return creators;
}

// ---------------------- INFORMACION ----------------------
const bgInfo = document.getElementById('bgInfo');
const movieInfo = document.getElementById('movieInfo');

const getInfo = async(type, id) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`);
    const datos = await respuesta.json();

    // DURACION
    if (type == "movie") {
        const horas = Math.floor(datos.runtime / 60);
        minutos = datos.runtime % 60;
        var duracion = `${horas} h ${minutos} min`
    } else if(type == "tv") {
        if (datos.number_of_seasons == 1) {
            var duracion = `${datos.number_of_episodes} episodios`
        } else{
            var duracion = `${datos.number_of_seasons} temporadas`
        }
    }

    // GENERO
    const genres = datos.genres;
    const generos = genres.map(genero => genero.name);
    const gene = generos.join(", ");

    // FECHA
    const date = datos.release_date || datos.last_air_date || datos.first_air_date;

    const forYou = Math.floor((Math.random() * (99 - 88)) + 88);

    logoURL = await getLogos(type, id);
    cast = await getCredits(type, id);
    creators = await getCreators(type, id);

    bgInfo.classList.add('bgInfo');
    movieInfo.classList.add('movieInfo');
    if (logoURL == undefined) {
        movieInfo.innerHTML = `
        <div class="imgInfo">
            <img class="backdrop" src="https://image.tmdb.org/t/p/original/${datos.backdrop_path}">
            <div class="logoBtns">
                <button class="reproducir">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                    <span>Reproducir</span>
                </button>
                <button class="miLista">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="#fff"></path></svg>
                </button>
                <button class="rate">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="#fff"></path></svg>
                </button>
            </div>
            <div id="exit" class="exit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="#fff"></path></svg>
            </div>
            <div class="shadowBack"></div>
        </div>
        <div class="info">
            <div class="metadataL">
                <div class="metadata">
                    <span class="forYou">${forYou} % para ti</span>
                    <span class="year">${date.slice(0, 4)}</span>
                    <span class="age">18+</span>
                    <span class="duration">${duracion}</span>
                    <span class="quality">HD</span>
                    <svg viewBox="0 0 58.07 24" class="svg-icon svg-icon-audio-description"><path fill="#fff" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path></svg>
                </div>
                <div class="sipnosis">
                    <p>${datos.overview}</p>
                </div>
            </div>
            <div class="metadataR">
                <div class="created"><span>Elenco:</span> ${cast}, más</div>
                <div class="genres"><span>Géneros:</span> ${gene}</div>
                <div class="created"><span>Creado por:</span> ${creators}</div>
            </div>
        </div>
        `
    } else{
        movieInfo.innerHTML = `
        <div class="imgInfo">
            <img class="backdrop" src="https://image.tmdb.org/t/p/w1280/${datos.backdrop_path}">
            <div class="logoBtns">
                <div class="divLogo">
                    <img class="logo" src="https://image.tmdb.org/t/p/w500/${logoURL}">
                </div>
                <button class="reproducir">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                    <span>Reproducir</span>
                </button>
                <button class="miLista">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="#fff"></path></svg>
                </button>
                <button class="rate">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="#fff"></path></svg>
                </button>
            </div>
            <div id="exit" class="exit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="#fff"></path></svg>
            </div>
            <div class="shadowBack"></div>
        </div>
        <div class="info">
            <div class="metadataL">
                <div class="metadata">
                    <span class="forYou">${forYou} % para ti</span>
                    <span class="year">${date.slice(0, 4)}</span>
                    <span class="age">18+</span>
                    <span class="duration">${duracion}</span>
                    <span class="quality">HD</span>
                    <svg viewBox="0 0 58.07 24" class="svg-icon svg-icon-audio-description"><path fill="#fff" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path></svg>
                </div>
                <div class="sipnosis">
                    <p>${datos.overview}</p>
                </div>
            </div>
            <div class="metadataR">
                <div class="created"><span>Elenco:</span> ${cast}, más</div>
                <div class="genres"><span>Géneros:</span> ${gene}</div>
                <div class="created"><span>Creado por:</span> ${creators}</div>
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
        getInfo(type, id);
    });

    window.addEventListener('click', function(e){
        const exit = document.getElementById('exit');
        if (!movieInfo.contains(e.target) || exit.contains(e.target)){
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
/* <iframe id="myVideo" width="891" height="501"
src="https://www.youtube.com/embed/KmfnQMJmK2w?vq=hd720&autoplay=1&mute=1&enablejsapi=1">
</iframe> */


cargarPeliculas("movie", "movie/now_playing", "page=2", "Agregados recientemente","latest", "1", "latestSlider");
cargarPeliculas("movie", "movie/popular", "", "Tendencias","trends", "2", "trendsSlider");
cargarPeliculas("tv", "discover/tv", "with_networks=213", "Series","series", "3", "seriesSlider");
cargarPeliculas("tv", "discover/tv", "with_genres=18&page=2", "Series dramáticas","tvDrama", "4", "tvDramaSlider");