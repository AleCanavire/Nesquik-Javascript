// Validacion de texto en el input
const inputPassword = document.getElementById('password');
const passwordSpan = document.querySelector('.password-label');

inputPassword.addEventListener('keyup', () => {
    inputPassword.value != "" ? passwordSpan.classList.add('focusInput') : passwordSpan.classList.remove('focusInput');
});

// Rellenar automaticamente el email con el email ingresado en el index
const userEmail = document.querySelector('.user-email');
userEmail.innerText = localStorage.getItem('email') || "Ingrese un email en la pagina de inicio.";

// Guardar password en el localStorage
inputPassword.addEventListener('keyup', () => {
    localStorage.setItem('password', inputPassword.value);
});

// Crear nuevo usuario
const btnNewUser = document.querySelector('#newUser-btn');
btnNewUser.addEventListener("click", () =>{
    newUser()
});

// Crear nuevo usuario funcion
function newUser() {
    const user = {
        email: localStorage.getItem('email') ,
        pass: inputPassword.value
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    let usersJSON = JSON.stringify(users);
    localStorage.setItem('users', usersJSON);
};