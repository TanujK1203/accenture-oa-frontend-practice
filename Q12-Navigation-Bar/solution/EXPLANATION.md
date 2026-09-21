# What changed and why

- **HTML:** `<a href="#contact" class="nav-link">Contact</a>` after Services. `querySelectorAll('.nav-link')` runs on load, so the new link is included automatically.
- **CSS:** In `.navbar`, change `display: block` to `display: flex` and add `justify-content: space-between`. The first link goes to the left edge, the last to the right edge, and the space between them is shared equally. `justify-content` only works on a flex (or grid) container, which is why changing `display` matters.
- **CSS:** `.nav-link:hover { background-color: #374151; }`. Put it *before* `.nav-link.active` (equal specificity, so the later rule wins) and the active link stays blue when hovered.
- **JS (bug):** The old code added `active` to the clicked link and *then* removed `active` from every link, including the one just clicked, so nothing stayed highlighted. Order matters: clear all first, then add to the clicked one.
- **JS:** `title.textContent = link.textContent;` copies the link's text into the heading.
