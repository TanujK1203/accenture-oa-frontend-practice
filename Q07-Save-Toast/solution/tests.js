// Q07: one test per objective, in order.
const TESTS = [
    async (t) => {
        const note = t.need(t.$('textarea.note'), 'The textarea with class "note"');
        t.ok(note.id === 'noteInput', 'The textarea must have id="noteInput", found id="' + note.id + '"');
    },
    async (t) => {
        const toast = t.need(t.$('#toast'), 'Toast #toast');
        t.ok(t.css(toast, 'position') === 'fixed', 'The toast must use position: fixed, found ' + t.css(toast, 'position'));
        const r = t.rect(toast);
        const fromBottom = Math.round(t.win.innerHeight - r.bottom);
        const fromRight = Math.round(t.doc.documentElement.clientWidth - r.right);
        t.ok(fromBottom === 20 && fromRight === 20, 'The toast must be 20px from the bottom and 20px from the right, found ' + fromBottom + 'px and ' + fromRight + 'px');
    },
    async (t) => {
        const toast = t.need(t.$('#toast'), 'Toast #toast');
        toast.style.transition = 'none';
        toast.classList.add('show');
        t.ok(t.css(toast, 'opacity') === '1', 'A toast with the class "show" must have opacity 1, found ' + t.css(toast, 'opacity'));
    },
    async (t) => {
        const toast = t.need(t.$('#toast'), 'Toast #toast');
        t.click(t.need(t.$('#saveBtn'), 'Button #saveBtn'));
        t.ok(toast.classList.contains('show'), 'Right after clicking Save the toast must still have the class "show". Is something removing it immediately?');
    },
    async (t) => {
        const toast = t.need(t.$('#toast'), 'Toast #toast');
        const before = t.timers().length;
        t.click(t.need(t.$('#saveBtn'), 'Button #saveBtn'));
        const timer = t.timers().slice(before).find((x) => x.kind === 'timeout');
        t.ok(timer, 'Clicking Save must start a setTimeout');
        t.ok(typeof timer.fn === 'function', 'setTimeout must receive a function: pass hideToast, not hideToast()');
        t.ok(Number(timer.delay) === 3000, 'The toast must hide after 3000 ms, found ' + timer.delay);
        timer.fn();
        t.ok(!toast.classList.contains('show'), 'When the timer fires the class "show" must be removed');
    },
];
