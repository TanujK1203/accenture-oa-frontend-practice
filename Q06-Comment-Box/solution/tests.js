// Q06: one test per objective, in order.
const TESTS = [
    async (t) => {
        const list = t.need(t.$('#commentList'), 'An element with id "commentList"');
        t.ok(list.tagName === 'UL', '#commentList must be a <ul>, found <' + list.tagName.toLowerCase() + '>');
        t.ok(list.classList.contains('comment-list'), '#commentList must have the class "comment-list"');
        t.ok(t.need(t.$('#postBtn'), 'Button #postBtn').compareDocumentPosition(list) & 4, 'The list must come after the Post button');
    },
    async (t) => {
        const list = t.need(t.$('#commentList'), 'List #commentList');
        t.ok(t.css(list, 'listStyleType') === 'none', 'The list must not show bullets (list-style: none), found ' + t.css(list, 'listStyleType'));
    },
    async (t) => {
        const input = t.need(t.$('#commentInput'), 'Textarea #commentInput');
        const post = t.need(t.$('#postBtn'), 'Button #postBtn');
        t.need(t.$('#commentList'), 'List #commentList');
        input.value = '  Great post!  ';
        t.click(post);
        input.value = '<b>Second</b>';
        t.click(post);
        const items = t.$$('#commentList > li');
        t.ok(items.length === 2, 'After posting twice the list must have 2 <li>, found ' + items.length);
        t.ok(items.every((li) => li.classList.contains('comment')), 'Every new <li> must have the class "comment"');
        t.ok(items[0].textContent === 'Great post!', 'The first comment must read "Great post!" (trimmed), found "' + items[0].textContent + '"');
        t.ok(items[1].textContent === '<b>Second</b>' && !items[1].querySelector('b'), 'Use textContent, not innerHTML: "<b>Second</b>" must appear as plain text');
        t.ok(input.value === '', 'The textarea must be cleared after posting');
        t.ok(t.text(t.$('#count')) === '2', '#count must read 2, found "' + t.text(t.$('#count')) + '"');
    },
    async (t) => {
        const input = t.need(t.$('#commentInput'), 'Textarea #commentInput');
        t.need(t.$('#commentList'), 'List #commentList');
        input.value = '    ';
        t.click(t.need(t.$('#postBtn'), 'Button #postBtn'));
        t.ok(t.$$('#commentList > li').length === 0, 'A comment of only spaces must not be added');
        t.ok(t.text(t.$('#count')) === '0', '#count must stay 0, found "' + t.text(t.$('#count')) + '"');
    },
    async (t) => {
        const list = t.need(t.$('#commentList'), 'List #commentList');
        for (let i = 1; i <= 4; i++) {
            const li = t.doc.createElement('li');
            li.className = 'comment';
            li.textContent = 'Comment ' + i;
            list.appendChild(li);
        }
        const items = t.$$('#commentList > li');
        const even = t.rgb('#eef3ff');
        t.ok(t.css(items[1], 'backgroundColor') === even && t.css(items[3], 'backgroundColor') === even,
            'The 2nd and 4th comments must have the background #eef3ff, found ' + t.css(items[1], 'backgroundColor'));
        t.ok(t.css(items[0], 'backgroundColor') !== even, 'Odd comments must keep their normal background');
    },
];
