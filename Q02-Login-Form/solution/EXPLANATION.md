# What changed and why

- **HTML:** The password input needs `type="password"`, which is what masks the characters. The username input gets `placeholder="Enter username"`.
- **HTML (bug):** `<label for="pwd">` pointed at an id that doesn't exist. `for` must match the input's **id**, so change it to `for="password"`. Then clicking the label focuses the input.
- **CSS:** `.input:focus { border-color: #0073e6; }`. The `:focus` pseudo-class applies only while the user is typing in the field.
- **JS (bug):** Without `event.preventDefault()`, submitting a form reloads the page and your message disappears immediately.
- **JS (bug):** Inputs keep what the user typed in `.value`. `.textContent` of an `<input>` is always `''`, so the old code always said "Please enter your username".
- **JS:** `.trim()` removes the spaces around the name, and it also turns a username of only spaces into `''`, which is caught as empty.
