const followBtn = document.getElementById('followBtn');

followBtn.addEventListener('click', function () {
    const isFollowing = followBtn.classList.toggle('following');
    followBtn.textContent = isFollowing ? 'Following' : 'Follow';
});
