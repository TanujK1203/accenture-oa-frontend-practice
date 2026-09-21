const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', function () {
    const more = document.getElementById('more');
    more.classList.toggle('.show');

    if (more.classList.contains('show')) {
        toggleBtn.textContent = 'Read Less';
    } else {
        toggleBtn.textContent = 'Read More';
    }
});
