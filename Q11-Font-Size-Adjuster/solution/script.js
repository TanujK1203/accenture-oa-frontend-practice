let size = 16;
const article = document.getElementById('article');
const sizeLabel = document.getElementById('sizeLabel');

function applySize() {
    article.style.fontSize = size + 'px';
    sizeLabel.textContent = size + 'px';
}

document.getElementById('increaseBtn').addEventListener('click', function () {
    size = Math.min(size + 2, 24);
    applySize();
});

document.getElementById('decreaseBtn').addEventListener('click', function () {
    size = Math.max(size - 2, 12);
    applySize();
});

document.getElementById('resetBtn').addEventListener('click', function () {
    size = 16;
    applySize();
});
