const showBtn = document.getElementById('showBtn');

showBtn.addEventListener('click', function () {
    setTimeout(function () {
        document.getElementById('message').textContent = 'Welcome to Accenture!';
    }, 1000);
});
