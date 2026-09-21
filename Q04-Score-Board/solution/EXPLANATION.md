# What changed and why

- **HTML:** `<button class="add-btn" data-team="A" data-points="3">+3</button>` after Team A's `+2`. The JS reads `data-team` and `data-points` through `button.dataset.team` / `button.dataset.points`, so the new button works with no JS change.
- **JS (bug):** `textContent` and `dataset` values are always **strings**, and `'0' + '2'` is `'02'`, not `2`. Convert both sides first: `Number(scoreEl.textContent) + Number(button.dataset.points)`.
- **JS:** `classList.toggle(name, condition)` adds the class when the condition is `true` and removes it when `false`. `toggle('leading', a > b)` and `toggle('leading', b > a)` handle all three cases, and a tie makes both conditions false.
- **CSS:** `.team.leading { border-color: #ffb703; }`. Only the colour changes; the 4px width comes from `.team`.
- **JS:** Reset writes `0` into both scores and calls `updateLeader()`, which removes `leading` from both teams because `0 > 0` is false.
