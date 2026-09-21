// Q09: one test per objective, in order.
const TESTS = [
    async (t) => {
        const input = t.need(t.$('#celsius'), 'Input #celsius');
        t.ok(input.type === 'number', 'The input must have type="number", found type="' + input.type + '"');
    },
    async (t) => {
        const input = t.need(t.$('#celsius'), 'Input #celsius');
        const btn = t.need(t.$('#convertBtn'), 'Button #convertBtn');
        const result = t.need(t.$('#result'), 'Paragraph #result');
        for (const [c, f] of [['25', '77.0 °F'], ['36.6', '97.9 °F'], ['-40', '-40.0 °F']]) {
            input.value = c;
            t.click(btn);
            t.ok(t.text(result) === f, c + ' °C must show "' + f + '", found "' + t.text(result) + '"');
        }
    },
    async (t) => {
        const input = t.need(t.$('#celsius'), 'Input #celsius');
        const result = t.need(t.$('#result'), 'Paragraph #result');
        input.value = '';
        t.click(t.need(t.$('#convertBtn'), 'Button #convertBtn'));
        t.ok(t.text(result) === 'Please enter a valid number', 'An empty input must show "Please enter a valid number", found "' + t.text(result) + '"');
    },
    async (t) => {
        const input = t.need(t.$('#celsius'), 'Input #celsius');
        const btn = t.need(t.$('#convertBtn'), 'Button #convertBtn');
        const result = t.need(t.$('#result'), 'Paragraph #result');
        input.value = '30';
        t.click(btn);
        t.ok(result.classList.contains('hot'), 'At 30 °C #result must have the class "hot"');
        t.ok(t.css(result, 'color') === t.rgb('#e63946'), 'A hot result must have the color #e63946, found ' + t.css(result, 'color'));
        input.value = '20';
        t.click(btn);
        t.ok(!result.classList.contains('hot'), 'At 20 °C the class "hot" must be removed');
    },
    async (t) => {
        const result = t.need(t.$('#result'), 'Paragraph #result');
        t.ok(t.css(result, 'fontSize') === '24px', '#result font size must be 24px, found ' + t.css(result, 'fontSize'));
    },
];
