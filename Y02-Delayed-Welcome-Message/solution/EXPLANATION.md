# What changed and why

- **CSS:** Change the existing `body` declaration to `background-color: #e6f2ff;`. Don't add a second `body` rule that a later rule could override.
- **HTML:** `<p id="message" class="message"></p>`. The JavaScript already calls `getElementById('message')`. Without the id it returns `null`, and one second after the click the page throws `Cannot set properties of null (setting 'textContent')`.
- **JS:** The second argument of `setTimeout` is the delay in milliseconds, so change `1000` to `5000`. Nothing else in the logic changes.
- Lesson from the real OA: read the existing JS first. The ids it looks up tell you which ids the HTML is missing.
