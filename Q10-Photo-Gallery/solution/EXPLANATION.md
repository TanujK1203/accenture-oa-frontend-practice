# What changed and why

- **HTML:** `<img class="thumb" src="https://picsum.photos/id/40/480/300" alt="Photo 4">` after the third thumbnail. `querySelectorAll('.thumb')` runs on load, so the new image gets a click listener with no JS change.
- **CSS:** `.thumbnails { display: flex; gap: 10px; }`. Images are *inline* by default, so the spaces between the tags in the HTML add a few extra pixels. With flexbox that whitespace is ignored and `gap` gives exactly 10px. `justify-content: center` keeps the row centred.
- **CSS:** `.thumb.active { border-color: #ff6b00; }`. The border width and style already come from `.thumb`; only the colour changes.
- **JS (bug):** `getElementsByClassName` returns an **HTMLCollection**, which has no `.forEach`, so the page threw `thumbs.forEach is not a function` on load. `querySelectorAll` returns a **NodeList**, which does. `Array.from(thumbs).forEach(...)` would also work.
- **JS:** Copy `thumb.alt` to both `mainImage.alt` and `caption.textContent`. To move `active`, remove it from every thumbnail, then add it to the clicked one. In that order: the other way round removes it from the clicked one too.
