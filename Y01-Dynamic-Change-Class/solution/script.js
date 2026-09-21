const btn = document.getElementById('btn');
const para = document.getElementById('p');

btn.addEventListener('click', function () {
    para.classList.add('change');
    btn.classList.add('change');
});
