const mainImage = document.getElementById('mainImage');
const caption = document.getElementById('caption');
const thumbs = document.getElementsByClassName('thumb');

thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
        mainImage.src = thumb.src;
        // TODO: also copy the thumbnail's alt to the main image and to the caption text
        // TODO: move the "active" class to the clicked thumbnail
    });
});
