const input = document.getElementById('commentInput');
const postBtn = document.getElementById('postBtn');
const count = document.getElementById('count');

postBtn.addEventListener('click', function () {
    const text = input.value;
    // TODO: ignore empty comments (only spaces also count as empty)

    const li = document.createElement('<li>');
    li.className = 'comment';
    li.textContent = text;
    document.getElementById('commentList').appendChild(li);

    // TODO: clear the textarea and update the count
});
