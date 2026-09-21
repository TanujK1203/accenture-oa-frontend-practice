# Q07 — Save Toast

## How to Attempt?

You are tasked with completing a Notes page that shows a "Saved" toast message. The project is partially complete and contains 1 bug in the JavaScript. Implement the remaining HTML, CSS and JavaScript requirements and fix the bug so the toast behaves as described.

## Objectives

- Add the id `noteInput` to the textarea (keep its class `note`).
- The toast must stay fixed to the bottom-right corner of the screen, `20px` from the bottom and `20px` from the right.
- A toast with the class `show` must be fully visible (`opacity: 1`).
- Clicking Save must show the toast by adding the class `show`, and the toast must still be visible right after the click.
- The toast must hide automatically (remove `show`) 3 seconds after Save is clicked. It currently uses 1 second.

## Constraints

- Do not remove or rename the existing ids and class names.
- Use `setTimeout` to hide the toast, not `setInterval`.
