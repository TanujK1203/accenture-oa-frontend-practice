// Q04: one test per objective, in order.
const TESTS = [
    async (t) => {
        const btn = t.need(t.$('#teamA .add-btn[data-team="A"][data-points="3"]'), 'A Team A button with class "add-btn", data-team="A" and data-points="3"');
        t.ok(t.text(btn) === '+3', 'The new button text must be "+3", found "' + t.text(btn) + '"');
        const plus2 = t.need(t.$('#teamA .add-btn[data-points="2"]'), "Team A's +2 button");
        t.ok(plus2.compareDocumentPosition(btn) & 4, "The +3 button must come after Team A's +2 button");
    },
    async (t) => {
        const a1 = t.need(t.$('#teamA [data-points="1"]'), "Team A's +1 button");
        const a2 = t.need(t.$('#teamA [data-points="2"]'), "Team A's +2 button");
        const b3 = t.need(t.$('#teamB [data-points="3"]'), "Team B's +3 button");
        t.click(a2);
        t.click(a1);
        t.ok(t.text(t.$('#scoreA')) === '3', 'Team A +2 then +1 must give 3, found "' + t.text(t.$('#scoreA')) + '"');
        t.click(b3);
        t.click(b3);
        t.ok(t.text(t.$('#scoreB')) === '6', 'Team B +3 twice must give 6, found "' + t.text(t.$('#scoreB')) + '"');
    },
    async (t) => {
        const teamA = t.need(t.$('#teamA'), 'Team A box');
        const teamB = t.need(t.$('#teamB'), 'Team B box');
        const lead = () => (teamA.classList.contains('leading') ? 'A' : '') + (teamB.classList.contains('leading') ? 'B' : '');
        t.click(t.$('#teamA [data-points="2"]'));
        t.ok(lead() === 'A', 'At 2-0 only Team A must have "leading", found: ' + (lead() || 'none'));
        t.click(t.$('#teamB [data-points="3"]'));
        t.ok(lead() === 'B', 'At 2-3 only Team B must have "leading", found: ' + (lead() || 'none'));
        t.click(t.$('#teamA [data-points="1"]'));
        t.ok(lead() === '', 'At 3-3 (a tie) neither team may have "leading", found: ' + lead());
    },
    async (t) => {
        const team = t.need(t.$('#teamA'), 'Team A box');
        team.classList.add('leading');
        const color = t.css(team, 'borderTopColor');
        t.ok(color === t.rgb('#ffb703'), 'A leading team must have the border color #ffb703, found ' + color);
    },
    async (t) => {
        t.click(t.$('#teamA [data-points="2"]'));
        t.click(t.$('#teamB [data-points="1"]'));
        t.click(t.need(t.$('#resetBtn'), 'Button #resetBtn'));
        t.ok(t.text(t.$('#scoreA')) === '0' && t.text(t.$('#scoreB')) === '0', 'Reset must set both scores to 0');
        t.ok(!t.$('#teamA').classList.contains('leading') && !t.$('#teamB').classList.contains('leading'), 'Reset must remove "leading" from both teams');
    },
];
