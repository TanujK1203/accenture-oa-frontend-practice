const input = document.getElementById('commentInput');
const postBtn = document.getElementById('postBtn');
const count = document.getElementById('count');

postBtn.addEventListener('click', function () {
    const text = input.value.trim();
    if (text === '') {
        return;
    }

    const list = document.getElementById('commentList');
    const li = document.createElement('li');
    li.className = 'comment';
    li.textContent = text;
    list.appendChild(li);

    input.value = '';
    count.textContent = list.children.length;
});
