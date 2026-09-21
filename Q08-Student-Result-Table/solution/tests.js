// Q08: one test per objective, in order.
const TESTS = [
    async (t) => {
        const rows = t.$$('#resultTable tbody tr');
        const last = rows[rows.length - 1];
        const cells = last ? Array.from(last.children) : [];
        t.ok(cells.length && t.text(cells[0]) === 'Rohan', 'The last row of the table body must be for "Rohan"');
        t.ok(cells.length === 3, "Rohan's row must have 3 cells, found " + cells.length);
        t.ok(cells[1].classList.contains('marks') && t.text(cells[1]) === '40', 'The second cell must have the class "marks" and read 40');
        t.ok(cells[2].classList.contains('result'), 'The third cell must have the class "result"');
    },
    async (t) => {
        const table = t.need(t.$('#resultTable'), 'Table #resultTable');
        t.ok(t.css(table, 'borderCollapse') === 'collapse', 'The table must use border-collapse: collapse, found ' + t.css(table, 'borderCollapse'));
    },
    async (t) => {
        const th = t.need(t.$('#resultTable th'), 'A header cell');
        t.ok(t.css(th, 'backgroundColor') === t.rgb('#2d3e50'), 'th background must be #2d3e50, found ' + t.css(th, 'backgroundColor'));
        t.ok(t.css(th, 'color') === t.rgb('#ffffff'), 'th text color must be #ffffff, found ' + t.css(th, 'color'));
    },
    async (t) => {
        t.click(t.need(t.$('#checkBtn'), 'Button #checkBtn'));
        for (const row of t.$$('#resultTable tbody tr')) {
            const name = t.text(row.children[0]);
            const expected = Number(t.text(row.querySelector('.marks'))) >= 40 ? 'Pass' : 'Fail';
            const got = t.text(row.querySelector('.result'));
            t.ok(got === expected, name + ' must be "' + expected + '", found "' + got + '"');
        }
    },
    async (t) => {
        t.click(t.need(t.$('#checkBtn'), 'Button #checkBtn'));
        for (const row of t.$$('#resultTable tbody tr')) {
            const failing = Number(t.text(row.querySelector('.marks'))) < 40;
            const name = t.text(row.children[0]);
            t.ok(row.classList.contains('fail') === failing, name + (failing ? "'s row must have" : "'s row must not have") + ' the class "fail"');
        }
        const failRow = t.$('#resultTable tbody tr.fail');
        t.ok(failRow && t.css(failRow, 'backgroundColor') === t.rgb('#ffe5e5'),
            'A row with the class "fail" must have the background #ffe5e5, found ' + (failRow ? t.css(failRow, 'backgroundColor') : 'no failing row'));
    },
];
