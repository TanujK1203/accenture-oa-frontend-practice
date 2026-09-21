# What changed and why

- **HTML:** `<textarea id="noteInput" class="note" …>`. Add the id and keep the class.
- **CSS:** `position: fixed; bottom: 20px; right: 20px;` on `.toast`. `fixed` positions the element against the browser window, so it stays in the corner even when the page scrolls, and it no longer takes up space in the layout.
- **CSS:** `.toast.show { opacity: 1; }`. The existing `transition: opacity 0.3s` makes it fade in and out.
- **JS (bug):** `setTimeout(hideToast(), 1000)` **calls** `hideToast` immediately and passes its return value (`undefined`) to `setTimeout`. The toast was hidden the moment it appeared. Pass the function itself, `setTimeout(hideToast, 3000)`, or wrap it: `setTimeout(() => hideToast(), 3000)`.
- **JS:** The delay goes from `1000` to `3000` milliseconds.
