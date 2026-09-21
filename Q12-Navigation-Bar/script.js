const links = document.querySelectorAll('.nav-link');
const title = document.getElementById('pageTitle');

links.forEach(function (link) {
    link.addEventListener('click', function () {
        link.classList.add('active');
        links.forEach(function (other) {
            other.classList.remove('active');
        });
        // TODO: change the page title to the text of the clicked link
    });
});
