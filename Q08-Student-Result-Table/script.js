document.getElementById('checkBtn').addEventListener('click', function () {
    const rows = document.querySelectorAll('#resultTable tbody tr');

    rows.forEach(function (row) {
        const marks = row.querySelector('.marks').textContent;
        const resultCell = row.querySelector('.result');

        if (marks >= '40') {
            resultCell.textContent = 'Pass';
        } else {
            resultCell.textContent = 'Fail';
            // TODO: add the class "fail" to this row
        }
    });
});
