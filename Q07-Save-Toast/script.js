const toast = document.getElementById('toast');
const saveBtn = document.getElementById('saveBtn');

function hideToast() {
    toast.classList.remove('show');
}

saveBtn.addEventListener('click', function () {
    toast.classList.add('show');
    setTimeout(hideToast(), 1000);
});
