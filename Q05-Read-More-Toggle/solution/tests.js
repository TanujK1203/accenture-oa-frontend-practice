// Q05: one test per objective, in order.
const TESTS = [
    async (t) => {
        const more = t.need(t.$('#more'), 'An element with id "more"');
        t.ok(more.tagName === 'P' && more.classList.contains('more'), '#more must be a <p> with the class "more"');
        const expected = 'It also runs on servers, mobile apps and even smart TVs.';
        t.ok(t.text(more) === expected, 'The #more text must be "' + expected + '", found "' + t.text(more) + '"');
        t.ok(t.need(t.$('.intro'), 'The intro paragraph').nextElementSibling === more, '#more must come right after the intro paragraph');
    },
    async (t) => {
        const more = t.need(t.$('#more'), 'Paragraph #more');
        t.ok(t.css(more, 'display') === 'none', '#more must be hidden when the page loads, found display: ' + t.css(more, 'display'));
    },
    async (t) => {
        const more = t.need(t.$('#more'), 'Paragraph #more');
        more.classList.add('show');
        t.ok(t.css(more, 'display') === 'block', '#more.show must have display: block, found ' + t.css(more, 'display'));
    },
    async (t) => {
        const more = t.need(t.$('#more'), 'Paragraph #more');
        const btn = t.need(t.$('#toggleBtn'), 'Button #toggleBtn');
        t.click(btn);
        t.ok(more.classList.contains('show'), 'After one click #more must have the class "show"' + (more.classList.contains('.show') ? ' (found ".show" with a dot)' : ''));
        t.ok(t.text(btn) === 'Read Less', 'After one click the button must read "Read Less", found "' + t.text(btn) + '"');
        t.click(btn);
        t.ok(!more.classList.contains('show'), 'After a second click "show" must be removed');
        t.ok(t.text(btn) === 'Read More', 'After a second click the button must read "Read More", found "' + t.text(btn) + '"');
        t.ok(!more.getAttribute('style'), 'Toggle the class; do not set inline styles on #more');
    },
    async (t) => {
        const btn = t.need(t.$('#toggleBtn'), 'Button #toggleBtn');
        const bg = t.css(btn, 'backgroundColor');
        t.ok(bg === t.rgb('#6c63ff'), 'The button background must be #6c63ff, found ' + bg);
    },
];
