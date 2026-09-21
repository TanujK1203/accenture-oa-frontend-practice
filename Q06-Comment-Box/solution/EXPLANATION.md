# What changed and why

- **HTML:** `<ul id="commentList" class="comment-list"></ul>` after the Post button. The JS already looks it up by that id.
- **CSS:** `list-style: none;` on `.comment-list` removes the bullets. `list-style-type: none` works too.
- **CSS:** `.comment:nth-child(even) { background-color: #eef3ff; }`. `:nth-child` counts from 1, so `even` is the 2nd, 4th, … item. It's more specific than `.comment`, so it wins.
- **JS (bug):** `createElement` takes a tag **name**: `createElement('li')`. With `'<li>'` the browser throws `InvalidCharacterError` and nothing is added.
- **JS:** `input.value.trim()` removes the outer spaces, and a comment of only spaces becomes `''`. Return early in that case.
- **JS:** After `appendChild`, clear the box with `input.value = ''` and set the count from `list.children.length`, the real number of comments.
- Why `textContent`: `innerHTML = text` would turn `<b>hi</b>` (or a malicious `<img onerror=…>`) into real HTML. `textContent` always shows it as plain text.
