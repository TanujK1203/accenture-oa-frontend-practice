# What changed and why

- **HTML:** `<div class="light green"></div>` after the yellow light. `querySelectorAll('.light')` runs on page load, so the new light joins the cycle without any JS change.
- **CSS:** In `.traffic-light`, change `flex-direction: row` to `column` and `gap: 4px` to `12px`. `gap` sets the space *between* flex items, so there's no margin maths.
- **CSS:** `.light.on { opacity: 1; }`. The two classes together (0,2,0) beat `.light` (0,1,0) wherever the rule sits.
- **JS (bug):** Valid indexes run from `0` to `lights.length - 1`. `current > lights.length` let `current` reach `3`, and `lights[3]` is `undefined`, so `.classList` threw a TypeError right after every light had been switched off. Use `>=`, or `current = (current + 1) % lights.length`.
- **JS:** The second argument of `setInterval` is the period in ms: `3000` → `2000`.
