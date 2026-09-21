// Q01: one test per objective, in order.
const TESTS = [
    async (t) => {
        const name = t.need(t.$('.profile-card .name'), 'The name heading');
        const role = t.need(t.$('.profile-card .role'), 'A paragraph with class "role"');
        t.ok(role.tagName === 'P', 'The role must be a <p>, found <' + role.tagName.toLowerCase() + '>');
        t.ok(t.text(role) === 'Frontend Developer', 'The role text must be "Frontend Developer", found "' + t.text(role) + '"');
        t.ok(name.nextElementSibling === role, 'The role paragraph must come directly after the name');
    },
    async (t) => {
        const img = t.need(t.$('.avatar'), 'The avatar image');
        t.ok(img.getAttribute('alt') === 'Riya Sharma', 'The avatar alt must be "Riya Sharma", found ' + JSON.stringify(img.getAttribute('alt')));
    },
    async (t) => {
        const img = t.need(t.$('.avatar'), 'The avatar image');
        const radius = t.css(img, 'borderTopLeftRadius');
        const px = radius.endsWith('%') ? parseFloat(radius) / 100 * img.offsetWidth : parseFloat(radius);
        t.ok(px >= img.offsetWidth / 2 - 0.5, 'The avatar must be a circle (border-radius: 50%), found ' + radius);
    },
    async (t) => {
        const btn = t.need(t.$('#followBtn'), 'Button #followBtn');
        t.click(btn);
        t.ok(btn.classList.contains('following'), 'After one click the button must have the class "following"');
        t.ok(t.text(btn) === 'Following', 'After one click the text must be "Following", found "' + t.text(btn) + '"');
        t.click(btn);
        t.ok(!btn.classList.contains('following'), 'After a second click the class "following" must be removed');
        t.ok(t.text(btn) === 'Follow', 'After a second click the text must be "Follow", found "' + t.text(btn) + '"');
    },
    async (t) => {
        const btn = t.need(t.$('#followBtn'), 'Button #followBtn');
        btn.classList.add('following');
        const bg = t.css(btn, 'backgroundColor');
        t.ok(bg === t.rgb('#28a745'), 'With class "following" the background must be #28a745, found ' + bg);
    },
];
