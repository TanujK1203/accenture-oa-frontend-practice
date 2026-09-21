# Q04 — Score Board

## How to Attempt?

You are tasked with completing a basketball Score Board. The project is partially complete and contains 1 bug in the JavaScript. Implement the remaining HTML, CSS and JavaScript requirements and fix the bug so the scores add up correctly.

## Objectives

- Add a `+3` button for Team A with the class `add-btn`, `data-team="A"` and `data-points="3"`, after Team A's `+2` button.
- Clicking a points button must add its points to that team's score. For example, `+2` then `+1` gives `3`.
- The team with the higher score must have the class `leading` on its `.team` box, and the other team must not. If the scores are tied, neither team has it.
- A `.team` box with the class `leading` must have the border color `#ffb703`.
- Clicking Reset must set both scores back to `0` and remove the `leading` class from both teams.

## Constraints

- Do not remove or rename the existing ids, class names and data attributes.
- Keep each score as a plain number inside `#scoreA` and `#scoreB`.
