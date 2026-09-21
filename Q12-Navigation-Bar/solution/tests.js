// Q12: one test per objective, in order.
const TESTS = [
    async (t) => {
        const links = t.$$('.navbar .nav-link');
        t.ok(links.length === 4, 'The navbar must have 4 links, found ' + links.length);
        const last = links[3];
        t.ok(last.tagName === 'A', 'The Contact link must be an <a>');
        t.ok(t.text(last) === 'Contact', 'The fourth link must read "Contact", found "' + t.text(last) + '"');
        t.ok(last.getAttribute('href') === '#contact', 'The Contact link must have href="#contact", found ' + JSON.stringify(last.getAttribute('href')));
    },
    async (t) => {
        const nav = t.need(t.$('.navbar'), '.navbar');
        t.ok(t.css(nav, 'display') === 'flex', '.navbar must be a flex container, found display: ' + t.css(nav, 'display'));
        t.ok(t.css(nav, 'justifyContent') === 'space-between', '.navbar must use justify-content: space-between, found ' + t.css(nav, 'justifyContent'));
    },
    async (t) => {
        const link = t.need(t.$$('.navbar .nav-link')[1], 'The About link');
        const bg = t.pseudo(link, ':hover', 'backgroundColor');
        t.ok(bg === t.rgb('#374151'), 'A :hover rule must set the link background to #374151, found ' + (bg || 'no :hover rule'));
    },
    async (t) => {
        const links = t.$$('.navbar .nav-link');
        const active = () => links.map((l, i) => (l.classList.contains('active') ? i + 1 : 0)).filter(Boolean).join(',');
        t.click(links[2]);
        t.ok(active() === '3', 'After clicking Services only it may be active, found active: ' + (active() || 'none'));
        t.click(links[0]);
        t.ok(active() === '1', 'After clicking Home only it may be active, found active: ' + (active() || 'none'));
    },
    async (t) => {
        const links = t.$$('.navbar .nav-link');
        const title = t.need(t.$('#pageTitle'), 'Heading #pageTitle');
        t.click(links[1]);
        t.ok(t.text(title) === 'About', 'After clicking About the title must read "About", found "' + t.text(title) + '"');
        t.click(links[2]);
        t.ok(t.text(title) === 'Services', 'After clicking Services the title must read "Services", found "' + t.text(title) + '"');
    },
];
