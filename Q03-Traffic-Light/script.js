const lights = document.querySelectorAll('.light');
let current = 0;

function showLight(index) {
    lights.forEach(function (light) {
        light.classList.remove('on');
    });
    lights[index].classList.add('on');
}

function nextLight() {
    current++;
    if (current > lights.length) {
        current = 0;
    }
    showLight(current);
}

document.getElementById('nextBtn').addEventListener('click', nextLight);

document.getElementById('autoBtn').addEventListener('click', function () {
    setInterval(nextLight, 3000);
});

showLight(current);
