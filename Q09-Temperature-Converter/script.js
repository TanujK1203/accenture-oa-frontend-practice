const input = document.getElementById('celsius');
const result = document.getElementById('result');

document.getElementById('convertBtn').addEventListener('click', function () {
    // TODO: if the input is empty, show "Please enter a valid number" and stop

    const celsius = parseInt(input.value);
    const fahrenheit = celsius * 9 / 5 + 32;
    result.textContent = fahrenheit.toFixed(1) + ' °F';

    // TODO: add the class "hot" when celsius is 30 or more, remove it otherwise
});
