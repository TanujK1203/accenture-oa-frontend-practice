// Y02: one test per objective, in order.
const TESTS = [
    async (t) => {
        const bg = t.css(t.doc.body, 'backgroundColor');
        t.ok(bg === t.rgb('#e6f2ff'), 'The body background must be #e6f2ff, found ' + bg);
    },
    async (t) => {
        const p = t.need(t.$('p.message'), 'The <p> with class "message"');
        t.ok(p.id === 'message', 'The <p class="message"> must have id="message", found id="' + p.id + '"');
    },
    async (t) => {
        const btn = t.need(t.$('#showBtn'), 'Button #showBtn');
        const before = t.timers().length;
        t.click(btn);
        const timer = t.timers().slice(before).find((x) => x.kind === 'timeout');
        t.ok(timer, 'Clicking the button must start a setTimeout');
        t.ok(Number(timer.delay) === 5000, 'The timeout must be 5000 ms, found ' + timer.delay);
        const msg = t.need(t.$('#message'), 'Element #message');
        t.ok(t.text(msg) === '', 'The message must not appear before the 5 seconds are over');
        timer.fn();
        t.ok(t.text(msg) === 'Welcome to Accenture!', 'When the timer fires the message must read "Welcome to Accenture!"');
    },
];
