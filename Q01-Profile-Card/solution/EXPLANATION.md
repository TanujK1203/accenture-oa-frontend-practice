# What changed and why

- **HTML:** `<p class="role">Frontend Developer</p>` goes right after `<h2 class="name">`, and the image gets `alt="Riya Sharma"`. Screen readers read `alt`, and it also shows if the image fails to load.
- **CSS (TODO):** `border-radius: 50%` on `.avatar`. The image is a 100×100 square, so 50% makes it a circle.
- **CSS (bug):** The button's base color is set with `#followBtn`, an **id** selector with specificity (1,0,0). `.following` is a single class (0,1,0), so it loses even though it comes later in the file. Fix it with `#followBtn.following` (1,1,0).
- **JS (bug):** `getElementById('follow-btn')` passed the *class name*. The id is `followBtn`, so it returned `null`, and `null.addEventListener` threw `TypeError: Cannot read properties of null`.
- **JS (TODO):** `classList.toggle('following')` returns `true` when it has just added the class, so one line flips the text: `isFollowing ? 'Following' : 'Follow'`.
