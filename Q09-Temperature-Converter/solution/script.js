const input = document.getElementById('celsius');
const result = document.getElementById('result');

document.getElementById('convertBtn').addEventListener('click', function () {
    if (input.value.trim() === '') {
        result.textContent = 'Please enter a valid number';
        result.classList.remove('hot');
        return;
    }

    const celsius = parseFloat(input.value);
    const fahrenheit = celsius * 9 / 5 + 32;
    result.textContent = fahrenheit.toFixed(1) + ' °F';

    result.classList.toggle('hot', celsius >= 30);
});
