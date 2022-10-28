// ========== SEARCH ==========
const btn = document.getElementById("btn");
const search = document.querySelector("#search");
const container = document.getElementById("containerSearch");
const generalContainer = document.getElementById("generalContainer");

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
        generalContainer.style.zIndex = null;
        generalContainer.style.zIndex = "5"
        container.innerHTML = "";
    }
}

search.addEventListener("keydown", () => {
    if(search.value !== ""){
        generalContainer.style.zIndex = "15"
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


// ==================== NAV TRANSITION ====================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY !== 0) {
        nav.style.backgroundColor = "rgb(20, 20, 20)";
    } else if (scrollY === 0){
        nav.style.backgroundColor = null;
        nav.style.backgroundColor = "none";
    }
})

// ---------- SETTINGS ACCOUNT  ----------
const account = document.getElementById('account');
account.addEventListener('mouseover', ()=>{
    if (!document.querySelector('.accountMenu')) {
        const accountMenu = document.createElement('div');
        accountMenu.classList.add('accountMenu');
        accountMenu.innerHTML = `
        <div class="profiles">
            <ul class="profilesList">
                <li><img src="../img/profile2.png" alt="Imagen perfil 2"><p>Perfil 2</p></li>
                <li><img src="../img/profile3.png" alt="Imagen perfil 3"><p>Perfil 3</p></li>
                <li><img src="../img/profile4.png" alt="Imagen perfil 4"><p>Perfil 4</p></li>
                <li><img src="../img/profile5.png" alt="Imagen perfil 5"><p>Kids</p></li>
            </ul>
        </div>
        <div class="settings">
            <ul>
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path></svg>
                    <p>Administrar perfiles</p>
                </li>
                <li>
                    <svg id="profile-transfer" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C3.79086 1 2 2.79086 2 5V17C2 19.2091 3.79086 21 6 21H9.58579L8.29289 22.2929L9.70711 23.7071L12.7071 20.7071C13.0976 20.3166 13.0976 19.6834 12.7071 19.2929L9.70711 16.2929L8.29289 17.7071L9.58579 19H6C4.89543 19 4 18.1046 4 17V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V17C20 18.1046 19.1046 19 18 19H15V21H18C20.2091 21 22 19.2091 22 17V5C22 2.79086 20.2091 1 18 1H6ZM7.5 10C8.32843 10 9 9.32843 9 8.5C9 7.67157 8.32843 7 7.5 7C6.67157 7 6 7.67157 6 8.5C6 9.32843 6.67157 10 7.5 10ZM18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5ZM16.402 12.1985C15.7973 12.6498 14.7579 13 13.5 13C12.2421 13 11.2027 12.6498 10.598 12.1985L9.40195 13.8015C10.4298 14.5684 11.9192 15 13.5 15C15.0808 15 16.5702 14.5684 17.598 13.8015L16.402 12.1985Z" fill="currentColor"></path></svg>
                    <p>Transferir perfil</p>
                </li>
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.00011 8C9.00011 6.34315 10.3433 5 12.0001 5C13.657 5 15.0001 6.34315 15.0001 8C15.0001 9.65685 13.657 11 12.0001 11C10.3433 11 9.00011 9.65685 9.00011 8ZM12.0001 3C9.23869 3 7.00011 5.23858 7.00011 8C7.00011 10.7614 9.23869 13 12.0001 13C14.7615 13 17.0001 10.7614 17.0001 8C17.0001 5.23858 14.7615 3 12.0001 3ZM5.98069 21.1961C6.46867 18.7563 8.61095 17 11.0991 17H12.9011C15.3893 17 17.5316 18.7563 18.0195 21.1961L19.9807 20.8039C19.3057 17.4292 16.3426 15 12.9011 15H11.0991C7.65759 15 4.69447 17.4292 4.01953 20.8039L5.98069 21.1961Z" fill="currentColor"></path></svg>
                    <p>Cuenta</p>
                </li>
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 8.5C10.6831 8.5 10 9.24303 10 10H8C8 7.75697 10.0032 6.5 12 6.5C13.9968 6.5 16 7.75697 16 10C16 11.3487 14.9191 12.2679 13.8217 12.68C13.5572 12.7793 13.3322 12.9295 13.1858 13.0913C13.0452 13.2467 13 13.383 13 13.5V14H11V13.5C11 12.0649 12.1677 11.1647 13.1186 10.8076C13.8476 10.5339 14 10.1482 14 10C14 9.24303 13.3169 8.5 12 8.5ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z" fill="currentColor"></path></svg>
                    <p>Centro de ayuda</p>
                </li>
            </ul>
        </div>
        <div class="exitAccount">
            <a href="../index.html">Cerrar sesión en Nesquik</a>
        </div>`
        account.appendChild(accountMenu);
        accountMenu.clientHeight
        accountMenu.style.opacity = "1";
    }
    const accountMenu = document.querySelector('.accountMenu');
    accountMenu.addEventListener('mouseleave', ()=>{
        accountMenu.style.opacity = "0";
        setTimeout(() => {
            accountMenu.remove();
        }, 150);
        
    })
})


// ==================== HERO ====================
// ---------- GET INFO HERO ----------
const mainInfo = async(type, id) => {
    const logoInfo = document.getElementById('logoInfo');
    const logoMain = await getLogos(type, id);

    const respuesta = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`);
    try {
        const datos = await respuesta.json();

        logoInfo.innerHTML = `
        <div class="logoOverview">
            <img class="mainLogo" src="https://image.tmdb.org/t/p/original/${logoMain}">
            <p class="mainOverview">${datos.overview}</p>
        </div>
        <button id="btnPlay" class="reproducir">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
            <span>Reproducir</span>
        </button>
        <button id="moreInfo" class="moreInfo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="#fff"></path></svg>
            <span>Más información</span>
        </button>
        `;
        // ----- BACKDROP HERO -----
        const mainBackdrop = document.getElementById('mainBackdrop');
        const img = document.createElement('img');
        img.classList.add('backdropHero');
        img.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.backdrop_path}`)
        mainBackdrop.appendChild(img);
    
        // ----- MORE INFO -----
        const moreInfo = document.getElementById('moreInfo');
        moreInfo.addEventListener('click', () => {
            getInfo(type, id)
        })
    } catch (error) {
        console.log('Error', error);
    }
}
mainInfo("tv", "209167");

// ----- YOUTUBE API -----
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // ----- VOLUME BUTTON -----
    if (event.data == YT.PlayerState.PLAYING) {
        // ----- TRANSITION BACKDROP HERO -----
        setTimeout(function(){
            const backdrop = document.querySelector('.backdropHero');
            backdrop.style.opacity = '0';
            const mainLogo = document.querySelector('.mainLogo');
            mainLogo.style.transform = 'scale(0.7) translate3d(0, 8vw, 0)';
            const mainOverview = document.querySelector('.mainOverview');
            mainOverview.style.transform = 'scale(0.0)';
            mainOverview.style.opacity = '0';
        }, 4500);

        // ----- REAPARECER BACKDROP CUANDO TERMINA -----
        setTimeout(function(){
            const backdrop = document.querySelector('.backdropHero');
            backdrop.style.opacity = null;
            backdrop.style.opacity = '1';
            const mainLogo = document.querySelector('.mainLogo');
            mainLogo.style.transform = null;
            mainLogo.style.transform = 'scale(1.0) translate3d(0, 0, 0)';
            const mainOverview = document.querySelector('.mainOverview');
            mainOverview.style.transform = null;
            mainOverview.style.opacity = null;
            mainOverview.style.transform = 'scale(1.0)';
            mainOverview.style.opacity = '1';
        },120000)
        // ----- MUTE BUTTON -----
        const sound = document.getElementById('sound');
        sound.addEventListener('click', () => {
            if (player.isMuted() == false){
                player.mute();
                sound.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="#fff"></path><svg>
                `
            }else if (player.isMuted() == true){
                player.unMute();
                sound.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="#fff"></path></svg>
                `
            }
        })
    }
    // ----- RESTART BUTTON -----
    if (event.data == YT.PlayerState.ENDED) {
        const sound = document.getElementById('sound');
        sound.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.1747 3.07702C11.01 2.79202 8.81537 3.30372 6.99988 4.51679C5.18439 5.72987 3.8718 7.56158 3.30668 9.67065C2.74155 11.7797 2.96243 14.0223 3.92815 15.9806C4.89388 17.9389 6.53859 19.4794 8.55586 20.3149C10.5731 21.1505 12.8254 21.2242 14.893 20.5224C16.9606 19.8205 18.7025 18.391 19.7942 16.5L18.0622 15.5C17.2131 16.9708 15.8582 18.0826 14.2501 18.6285C12.642 19.1744 10.8902 19.1171 9.32123 18.4672C7.75224 17.8173 6.47302 16.6192 5.7219 15.096C4.97078 13.5729 4.79899 11.8287 5.23853 10.1883C5.67807 8.5479 6.69897 7.12324 8.11102 6.17973C9.52307 5.23623 11.23 4.83824 12.9137 5.05991C14.5974 5.28158 16.1432 6.10778 17.2629 7.3846C18.1815 8.43203 18.762 9.7241 18.9409 11.0921L17.5547 10.168L16.4453 11.8321L19.4453 13.8321C19.7812 14.056 20.2188 14.056 20.5547 13.8321L23.5547 11.8321L22.4453 10.168L20.9605 11.1578C20.784 9.27909 20.0201 7.49532 18.7666 6.06591C17.3269 4.42429 15.3395 3.36202 13.1747 3.07702Z" fill="#fff"></path></svg>
        `
        sound.addEventListener('click', () => {
            player.playVideo();
            setTimeout(function(){
                const backdrop = document.querySelector('.backdropHero');
                backdrop.style.opacity = '0';
                const mainLogo = document.querySelector('.mainLogo');
                mainLogo.style.transform = 'scale(0.7) translate3d(0, 8vw, 0)';
                const mainOverview = document.querySelector('.mainOverview');
                mainOverview.style.transform = 'scale(0.0)';
                mainOverview.style.opacity = '0';
            }, 4500);
        })
    }
}