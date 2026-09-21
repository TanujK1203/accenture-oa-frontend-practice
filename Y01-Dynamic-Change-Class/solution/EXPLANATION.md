# What changed and why

- **HTML:** `<p id="p" class="p">This a paragraph</p>` inside `.container`, above the button. The grader finds it with `getElementById('p')` and compares the text exactly, so keep the wording as given, even the missing "is".
- **CSS:** `.p.change { border-style: dashed; }` and `.btn.change { width: 120px; }`. Two chained classes have specificity (0,2,0), so they beat the base `.p` and `.btn` rules wherever they sit in the file.
- A single `.change { border-style: dashed; width: 120px; }` also passes, but only if it comes *after* `.btn`. The specificity is equal, so the later rule wins. Put it before `.btn` and the width silently stays 80px.
- **JS:** Look up the paragraph once, then call `classList.add('change')` on both elements inside the click handler. `add` (not `toggle`) keeps the styles on after a second click.
- Trap: writing `class="p change"` in the HTML. The page looks right, but it breaks the "before the click" constraint and the "dynamically" objective.
