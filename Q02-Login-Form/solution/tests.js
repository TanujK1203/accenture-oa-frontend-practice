// Q02: one test per objective, in order.
const TESTS = [
    async (t) => {
        const pwd = t.need(t.$('#password'), 'Input #password');
        t.ok(pwd.type === 'password', 'The password input must have type="password", found type="' + pwd.type + '"');
    },
    async (t) => {
        const pwd = t.need(t.$('#password'), 'Input #password');
        const label = t.need(t.$$('label').find((l) => t.text(l).startsWith('Password')), 'The "Password" label');
        t.ok(label.control === pwd, 'The "Password" label must point at the password input, found for="' + label.htmlFor + '"');
    },
    async (t) => {
        const user = t.need(t.$('#username'), 'Input #username');
        t.ok(user.placeholder === 'Enter username', 'The username placeholder must be "Enter username", found "' + user.placeholder + '"');
    },
    async (t) => {
        const user = t.need(t.$('#username'), 'Input #username');
        const color = t.pseudo(user, ':focus', 'borderColor') || t.pseudo(user, ':focus', 'borderTopColor');
        t.ok(color === t.rgb('#0073e6'), 'A :focus rule must set the border color to #0073e6, found ' + (color || 'no :focus rule'));
    },
    async (t) => {
        const form = t.need(t.$('#loginForm'), 'Form #loginForm');
        const user = t.need(t.$('#username'), 'Input #username');
        const msg = t.need(t.$('#msg'), 'Paragraph #msg');
        user.value = '  Asha  ';
        const ev = t.submit(form);
        t.ok(ev.defaultPrevented, 'The submit handler must call event.preventDefault() so the page does not reload');
        t.ok(t.text(msg) === 'Welcome, Asha!', 'For "  Asha  " #msg must read "Welcome, Asha!", found "' + t.text(msg) + '"');
        user.value = '   ';
        t.submit(form);
        t.ok(t.text(msg) === 'Please enter your username', 'For an empty username #msg must read "Please enter your username", found "' + t.text(msg) + '"');
    },
];
