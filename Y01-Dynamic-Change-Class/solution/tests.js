// Y01: one test per objective, in order.
const TESTS = [
    async (t) => {
        const p = t.need(t.$('#p'), 'An element with id "p"');
        t.ok(p.tagName === 'P', 'The element with id "p" must be a <p>, found <' + p.tagName.toLowerCase() + '>');
        t.ok(p.classList.contains('p'), 'The paragraph must have the class "p"');
        t.ok(t.text(p) === 'This a paragraph', 'Text must be exactly "This a paragraph", found "' + t.text(p) + '"');
        t.ok(p.closest('.container'), 'The paragraph must be inside .container');
        t.ok(p.compareDocumentPosition(t.need(t.$('#btn'), 'Button #btn')) & 4, 'The paragraph must come before the button');
    },
    async (t) => {
        const p = t.need(t.$('#p'), 'Paragraph #p');
        p.classList.add('change');
        t.ok(t.css(p, 'borderTopStyle') === 'dashed' && t.css(p, 'borderLeftStyle') === 'dashed',
            'With class "change" the paragraph border must be dashed, found ' + t.css(p, 'borderTopStyle'));
    },
    async (t) => {
        const btn = t.need(t.$('#btn'), 'Button #btn');
        btn.classList.add('change');
        t.ok(t.css(btn, 'width') === '120px', 'With class "change" the button width must be 120px, found ' + t.css(btn, 'width'));
    },
    async (t) => {
        const p = t.need(t.$('#p'), 'Paragraph #p');
        const btn = t.need(t.$('#btn'), 'Button #btn');
        t.ok(!p.classList.contains('change') && !btn.classList.contains('change'), 'Do not write "change" in the HTML; add it on click');
        t.ok(t.css(p, 'borderTopStyle') !== 'dashed', 'Before the click the paragraph border must not be dashed');
        t.ok(t.css(btn, 'width') === '80px', 'Before the click the button must stay 80px wide, found ' + t.css(btn, 'width'));
        t.click(btn);
        t.ok(p.classList.contains('change'), 'After the click the paragraph must have the class "change"');
        t.ok(btn.classList.contains('change'), 'After the click the button must have the class "change"');
    },
];
