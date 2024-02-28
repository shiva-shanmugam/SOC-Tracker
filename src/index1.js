const loginButton = document.getElementById('loginButton');
const loginForm = document.getElementById('loginForm');
const regButton = document.getElementById('regButton');
const regForm = document.getElementById('regForm');
const overlay = document.getElementById('overlay');
const overlay1 = document.getElementById('overlay1');
loginButton.addEventListener('click', () => {
    loginForm.style.right = '0'; 
    overlay.style.display = 'block'; 
});

overlay.addEventListener('click', () => {
    loginForm.style.right = '-600px';
    overlay.style.display = 'none'; 
});
regButton.addEventListener('click', () => {
    regForm.style.right = '0'; 
    overlay1.style.display = 'block'; 
});

overlay1.addEventListener('click', () => {
    regForm.style.right = '-600px';
    overlay1.style.display = 'none'; 
});