const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();

    if (username === '') {
        msg.textContent = 'Please enter your username';
    } else {
        msg.textContent = 'Welcome, ' + username + '!';
    }
});
