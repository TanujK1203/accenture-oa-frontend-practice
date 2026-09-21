# What changed and why

- **HTML:** `<button id="resetBtn" class="size-btn">Reset</button>` after A+. It picks up the button styles from `.size-btn`.
- **JS (bug):** `article.style.fontSize = 18` is ignored because CSS lengths need a unit. The browser silently rejects `"18"`, so the text never changed even though the label did. Use `size + 'px'`.
- **JS:** Clamp the size: `Math.min(size + 2, 24)` never exceeds 24 and `Math.max(size - 2, 12)` never drops below 12. An `if` check works just as well.
- **JS:** The Reset handler sets `size = 16` and calls `applySize()`, so the article and the label stay in sync.
- **CSS:** `max-width: 600px; margin: 0 auto;` on `.reader`. Auto left/right margins split the free space equally, which centres a block element horizontally. `max-width` (rather than `width`) lets it shrink on small screens.
- **CSS:** Change `line-height` from `1.2` to `1.6`. A unitless line height is a multiple of the font size, so it scales when A+ / A- change the size.
