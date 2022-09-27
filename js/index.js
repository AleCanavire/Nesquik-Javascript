// Validacion de texto en el input
const indexInput = document.querySelector('#email');
const emailSpan = document.querySelector('.placelabel');

indexInput.addEventListener('keyup', () => {
    indexInput.value != "" ? emailSpan.classList.add('focusInput') : emailSpan.classList.remove('focusInput');
});

// Tomar el email para rellenarlo automaticamente al signup
indexInput.addEventListener('keyup', () => {
    localStorage.setItem('email', indexInput.value);
});

// Cambio de idioma 
const selectLang = document.querySelector('#selectLang');

const signup = document.querySelector('#signup');
const title = document.querySelector('#title');
const newAccount = document.querySelector('#newAccount');
const start = document.querySelector('#start');
const background = document.querySelector('#background');

selectLang.addEventListener("change", () => {
    if (selectLang.value == "Español") {
        signup.innerText = "Iniciar sesión";
        title.innerHTML = `
        <h1>Películas y series ilimitadas y mucho más.</h1>
        <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>`;
        newAccount.innerText = "¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix."
        emailSpan.innerText = "Email"
        start.innerText = "Comenzar";
        background.innerHTML = `
        <img src="img/background-es.jpg" alt="background movies">
        `
    } else if(selectLang.value == "English"){
        signup.innerText = "Sign In";
        title.innerHTML = `
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>`
        newAccount.innerText = "Ready to watch? Enter your email to create or restart your membership."
        emailSpan.innerText = "Email Address"
        start.innerText = "Get Started";
        background.innerHTML = `
        <img src="img/background-en.jpg" alt="background movies">
        `
    }
})