const mainImage = document.getElementById('mainImage');
const caption = document.getElementById('caption');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
        caption.textContent = thumb.alt;

        thumbs.forEach(function (other) {
            other.classList.remove('active');
        });
        thumb.classList.add('active');
    });
});
