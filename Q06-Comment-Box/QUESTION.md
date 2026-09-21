# Q06 — Comment Box

## How to Attempt?

You are tasked with completing a Comment Box. The project is partially complete and contains 1 bug in the JavaScript. Implement the remaining HTML, CSS and JavaScript requirements and fix the bug so comments can be posted.

## Objectives

- Add an unordered list with the id `commentList` and the class `comment-list` below the Post button.
- The comment list must not show bullet points.
- Clicking Post must add the comment to the end of the list as an `<li>` with the class `comment` (leading and trailing spaces removed). It must also clear the textarea and update the number in `#count`.
- Empty comments, including comments of only spaces, must not be added.
- Every even comment (2nd, 4th, …) must have the background color `#eef3ff`.

## Constraints

- Do not remove or rename the existing ids and class names.
- Use `textContent`, not `innerHTML`, to put the comment text into the list item.
