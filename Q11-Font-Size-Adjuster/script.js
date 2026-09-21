let size = 16;
const article = document.getElementById('article');
const sizeLabel = document.getElementById('sizeLabel');

function applySize() {
    article.style.fontSize = size;
    sizeLabel.textContent = size + 'px';
}

document.getElementById('increaseBtn').addEventListener('click', function () {
    size = size + 2;
    // TODO: never go above 24
    applySize();
});

document.getElementById('decreaseBtn').addEventListener('click', function () {
    size = size - 2;
    // TODO: never go below 12
    applySize();
});

// TODO: the Reset button must set the size back to 16
