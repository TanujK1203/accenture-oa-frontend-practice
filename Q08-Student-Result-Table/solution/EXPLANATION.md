# What changed and why

- **HTML:** A new `<tr>` with three cells: `<td>Rohan</td>`, `<td class="marks">40</td>` and `<td class="result"></td>`. The JS finds cells by the `marks` and `result` classes, so the classes matter as much as the values.
- **CSS:** `border-collapse: collapse;` on the table merges each cell's border with its neighbour's, so you get one line instead of two.
- **CSS:** The `th` rule changes to `background-color: #2d3e50; color: #ffffff;`. Edit the existing rule rather than adding a weaker one.
- **JS (bug):** `textContent` is a **string**, and comparing two strings goes character by character: `'9' >= '40'` is `true` because `'9' > '4'`, and `'100' >= '40'` is `false` because `'1' < '4'`. Diya passed and Kabir failed. Convert with `Number(...)` and compare with the number `40`.
- **JS + CSS:** `row.classList.add('fail')` in the else branch, plus `tr.fail { background-color: #ffe5e5; }`.
- `40` counts as a pass because the rule is "40 or more", so use `>=`, not `>`. That's why Rohan's row was added.
