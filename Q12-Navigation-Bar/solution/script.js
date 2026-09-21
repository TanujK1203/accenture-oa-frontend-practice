const links = document.querySelectorAll('.nav-link');
const title = document.getElementById('pageTitle');

links.forEach(function (link) {
    link.addEventListener('click', function () {
        links.forEach(function (other) {
            other.classList.remove('active');
        });
        link.classList.add('active');
        title.textContent = link.textContent;
    });
});
