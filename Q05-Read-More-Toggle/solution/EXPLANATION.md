# What changed and why

- **HTML:** `<p id="more" class="more">It also runs on servers, mobile apps and even smart TVs.</p>` directly after `.intro`.
- **CSS (bug):** `.more { display: block; }` showed the text from the start. It must be `display: none;` so the paragraph is hidden on load.
- **CSS:** `.more.show { display: block; }`. Two chained classes (0,2,0) beat `.more` (0,1,0). A plain `.show { display: block; }` only works if it comes *after* `.more` in the file. That's an easy mark to lose.
- **JS (bug):** `classList` methods take the class **name**, with no dot. `toggle('.show')` added a class literally called `.show`, so the CSS never matched and `contains('show')` was always false.
- **CSS:** The button's `background-color` changes from `#333333` to `#6c63ff`.
- Why no inline styles: `more.style.display = 'block'` also "works", but graders check for the `show` class, and inline styles override your stylesheet in ways that are hard to undo.
