// Evitar recargo de pagina
const form = document.querySelector('form');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
})

// -------------- EMAIL --------------
// Validacion de texto en los input email
const emailLogin = document.getElementById('emailLogin');
const emailSpan = document.querySelector('.emailSpan');

emailLogin.addEventListener('keyup', () => {
    emailLogin.value != "" ? emailSpan.classList.add('inputLogin') : emailSpan.classList.remove('inputLogin');
});

// Texto de validacion de minimo de caracteres en email
const emailP = document.getElementById('validEmail');

emailLogin.addEventListener('keyup', () => {
    if (emailLogin.value == "") {
        emailP.innerHTML = `<p id="email-p">Ingresa un email o un número de teléfono válido.</p>`;
        emailLogin.style = 'border-bottom: 2px solid #e87c03'
    } else if (emailLogin.value.length > 0 && emailLogin.value.length <= 4) {
        emailP.innerHTML = `<p id="email-p">Escribe un email válido.</p>`;
        emailLogin.style = 'border-bottom: 2px solid #e87c03'
    } else{
        emailP.innerHTML = ``;
        emailLogin.style = 'border-bottom: none'
    }
});

// ------------- PASSWORD -------------
// Validacion de texto en los input password
const passLogin = document.getElementById('passLogin');
const passSpan = document.querySelector('.passSpan');

passLogin.addEventListener('keyup', () => {
    passLogin.value != "" ? passSpan.classList.add('inputLogin') : passSpan.classList.remove('inputLogin');
});

// Texto de validacion de minimo de caracteres en password
const passP = document.getElementById('validPass');

passLogin.addEventListener('keyup', () => {
    if (passLogin.value.length < 4) {
        passP.innerHTML = `<p id="pass-p">La contraseña debe tener entre 4 y 60 caracteres.</p>`;
        passLogin.style = 'border-bottom: 2px solid #e87c03'
    } else{
        passP.innerHTML = ``;
        passLogin.style = 'border-bottom: none'
    }
});

// -------------- LOCALSTORAGE --------------
// Buscar usuarios en localStorage
const btnLogin = document.querySelector('button');

// Transformo el JSON a array de objetos
const usersJSON = JSON.parse(localStorage.getItem('users'));

const incorrect = document.getElementById('incorrect');

// Recorro el array en busca de un usuario que coincida
btnLogin.addEventListener("click", ()=>{
    const findEmail = usersJSON.find(user => user.email === emailLogin.value);
    const findPass = usersJSON.find(user => user.pass === passLogin.value);

    // Si el usuario coincide lo envio al home
    if (findEmail && findPass) {
        window.location.href = '../views/home.html';
    } else if (findEmail && !findPass) {
        incorrect.classList.add('incorrect');
        incorrect.innerHTML = `
        <p><b>Contraseña incorrecta.</b> Reinténtalo o restablece la contraseña.</p>
        `
        const signup = document.querySelector('.signup');
        signup.style = 'margin-bottom: 10px;'
    } else if (!findEmail) {
        incorrect.classList.add('incorrect');
        incorrect.innerHTML = `
        <p>No podemos encontrar una cuenta con esta dirección de email. Reinténtalo o crea una cuenta nueva.</p>
        `
        const signup = document.querySelector('.signup');
        signup.style = 'margin-bottom: 10px;'
    }
});
