const buttons = document.querySelectorAll('.add-btn');
const scoreA = document.getElementById('scoreA');
const scoreB = document.getElementById('scoreB');
const teamA = document.getElementById('teamA');
const teamB = document.getElementById('teamB');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        const scoreEl = document.getElementById('score' + button.dataset.team);
        scoreEl.textContent = Number(scoreEl.textContent) + Number(button.dataset.points);
        updateLeader();
    });
});

function updateLeader() {
    const a = Number(scoreA.textContent);
    const b = Number(scoreB.textContent);
    teamA.classList.toggle('leading', a > b);
    teamB.classList.toggle('leading', b > a);
}

document.getElementById('resetBtn').addEventListener('click', function () {
    scoreA.textContent = 0;
    scoreB.textContent = 0;
    updateLeader();
});
