// Q03: one test per objective, in order.
const TESTS = [
    async (t) => {
        const green = t.need(t.$('.traffic-light .light.green'), 'A div with the classes "light green" inside .traffic-light');
        const lights = t.$$('.traffic-light .light');
        t.ok(green.tagName === 'DIV', 'The green light must be a <div>');
        t.ok(lights.length === 3 && lights[2] === green, 'The green light must be the third light, after yellow');
    },
    async (t) => {
        const lights = t.$$('.traffic-light .light');
        t.ok(lights.length >= 2, 'Expected at least two lights');
        for (let i = 0; i + 1 < lights.length; i++) {
            const a = t.rect(lights[i]);
            const b = t.rect(lights[i + 1]);
            t.ok(Math.abs(a.left - b.left) < 1, 'The lights must be stacked vertically, one below the other');
            const gap = Math.round(b.top - a.bottom);
            t.ok(gap === 12, 'The gap between lights must be 12px, found ' + gap + 'px');
        }
    },
    async (t) => {
        const lights = t.$$('.traffic-light .light');
        lights.forEach((l) => l.classList.remove('on'));
        lights[1].classList.add('on');
        t.ok(t.css(lights[1], 'opacity') === '1', 'A light with class "on" must have opacity 1, found ' + t.css(lights[1], 'opacity'));
        t.ok(Number(t.css(lights[0], 'opacity')) < 1, 'Lights without "on" must stay dim');
    },
    async (t) => {
        const lights = t.$$('.traffic-light .light');
        const btn = t.need(t.$('#nextBtn'), 'Button #nextBtn');
        const onIndex = () => lights.findIndex((l) => l.classList.contains('on'));
        t.ok(onIndex() === 0, 'The first light must be on when the page loads');
        for (let step = 1; step <= lights.length + 1; step++) {
            t.click(btn);
            const expected = step % lights.length;
            const count = lights.filter((l) => l.classList.contains('on')).length;
            t.ok(count === 1, 'Exactly one light must be on after click ' + step + ', found ' + count);
            t.ok(onIndex() === expected, 'After click ' + step + ' light #' + (expected + 1) + ' must be on, found #' + (onIndex() + 1));
        }
    },
    async (t) => {
        const lights = t.$$('.traffic-light .light');
        const before = t.timers().length;
        t.click(t.need(t.$('#autoBtn'), 'Button #autoBtn'));
        const timer = t.timers().slice(before).find((x) => x.kind === 'interval');
        t.ok(timer, 'Clicking Auto must start a setInterval');
        t.ok(Number(timer.delay) === 2000, 'The interval must be 2000 ms, found ' + timer.delay);
        timer.fn();
        t.ok(lights[1].classList.contains('on') && !lights[0].classList.contains('on'), 'Each tick must move the "on" class to the next light');
    },
];
