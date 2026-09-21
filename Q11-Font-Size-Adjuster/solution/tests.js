// Q11: one test per objective, in order.
const TESTS = [
    async (t) => {
        const reset = t.need(t.$('#resetBtn'), 'Button #resetBtn');
        t.ok(reset.classList.contains('size-btn') && t.text(reset) === 'Reset', '#resetBtn must have the class "size-btn" and the text "Reset"');
        t.ok(reset.closest('.toolbar'), '#resetBtn must be inside .toolbar');
        t.ok(t.need(t.$('#increaseBtn'), 'Button #increaseBtn').compareDocumentPosition(reset) & 4, '#resetBtn must come after the A+ button');
        t.click(t.$('#increaseBtn'));
        t.click(t.$('#increaseBtn'));
        t.click(reset);
        t.ok(t.css(t.$('#article'), 'fontSize') === '16px', 'Reset must set the article font size back to 16px, found ' + t.css(t.$('#article'), 'fontSize'));
        t.ok(t.text(t.$('#sizeLabel')) === '16px', 'Reset must set #sizeLabel back to "16px", found "' + t.text(t.$('#sizeLabel')) + '"');
    },
    async (t) => {
        const article = t.need(t.$('#article'), 'Paragraph #article');
        const label = t.need(t.$('#sizeLabel'), 'Label #sizeLabel');
        t.click(t.need(t.$('#increaseBtn'), 'Button #increaseBtn'));
        t.ok(t.css(article, 'fontSize') === '18px', 'After A+ the article must be 18px, found ' + t.css(article, 'fontSize'));
        t.ok(t.text(label) === '18px', 'After A+ #sizeLabel must read "18px", found "' + t.text(label) + '"');
        t.click(t.need(t.$('#decreaseBtn'), 'Button #decreaseBtn'));
        t.click(t.$('#decreaseBtn'));
        t.ok(t.css(article, 'fontSize') === '14px', 'After A+ then A- twice the article must be 14px, found ' + t.css(article, 'fontSize'));
    },
    async (t) => {
        const article = t.need(t.$('#article'), 'Paragraph #article');
        const label = t.need(t.$('#sizeLabel'), 'Label #sizeLabel');
        for (let i = 0; i < 10; i++) t.click(t.$('#increaseBtn'));
        t.ok(t.css(article, 'fontSize') === '24px' && t.text(label) === '24px', 'The size must stop at 24px, found ' + t.css(article, 'fontSize') + ' / label "' + t.text(label) + '"');
        for (let i = 0; i < 10; i++) t.click(t.$('#decreaseBtn'));
        t.ok(t.css(article, 'fontSize') === '12px' && t.text(label) === '12px', 'The size must stop at 12px, found ' + t.css(article, 'fontSize') + ' / label "' + t.text(label) + '"');
    },
    async (t) => {
        const reader = t.need(t.$('.reader'), '.reader');
        t.ok(t.css(reader, 'maxWidth') === '600px', '.reader must have max-width: 600px, found ' + t.css(reader, 'maxWidth'));
        const r = t.rect(reader);
        const left = r.left;
        const right = t.doc.documentElement.clientWidth - r.right;
        t.ok(Math.abs(left - right) < 2, '.reader must be centred horizontally, found ' + Math.round(left) + 'px on the left and ' + Math.round(right) + 'px on the right');
    },
    async (t) => {
        const article = t.need(t.$('#article'), 'Paragraph #article');
        const ratio = parseFloat(t.css(article, 'lineHeight')) / parseFloat(t.css(article, 'fontSize'));
        t.ok(Math.abs(ratio - 1.6) < 0.01, '.article line-height must be 1.6, found ' + ratio.toFixed(2));
    },
];
