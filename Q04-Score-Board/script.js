const buttons = document.querySelectorAll('.add-btn');
const scoreA = document.getElementById('scoreA');
const scoreB = document.getElementById('scoreB');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        const scoreEl = document.getElementById('score' + button.dataset.team);
        scoreEl.textContent = scoreEl.textContent + button.dataset.points;
        updateLeader();
    });
});

function updateLeader() {
    const a = Number(scoreA.textContent);
    const b = Number(scoreB.textContent);
    // TODO: add the class "leading" to the team with the higher score and remove it
    //       from the other team. If the scores are tied, neither team has it.
}

// TODO: Reset must set both scores to 0 and remove "leading" from both teams
