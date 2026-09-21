const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', function (event) {
    const username = document.getElementById('username').textContent;

    if (username === '') {
        msg.textContent = 'Please enter your username';
    } else {
        msg.textContent = 'Welcome, ' + username + '!';
    }
});
