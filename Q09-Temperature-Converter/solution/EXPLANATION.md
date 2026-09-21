# What changed and why

- **HTML:** Change `type="text"` to `type="number"`. The browser then only accepts numeric input and shows the up/down arrows.
- **JS (bug):** `parseInt('36.6')` is `36` because it cuts off everything after the decimal point, so 36.6 °C showed 96.8 °F. Use `parseFloat(...)` or `Number(...)`, which keep the decimals.
- **JS:** Check `input.value.trim() === ''` first and `return` early. Otherwise `parseFloat('')` gives `NaN` and the page shows `NaN °F`.
- **JS:** `toFixed(1)` rounds to one decimal and returns a **string**, so `77` becomes `"77.0"`. It runs after the maths, never before.
- **JS + CSS:** `result.classList.toggle('hot', celsius >= 30)` and `.result.hot { color: #e63946; }`. The chained selector beats the `.result` color.
- **CSS:** `.result` font size goes from `16px` to `24px`. Change the existing value; don't add a duplicate rule.
