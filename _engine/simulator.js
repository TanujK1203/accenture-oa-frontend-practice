// Front End Simulator engine. Questions come from questions.js (built by build.py).
(function () {
    'use strict';

    const QUESTIONS = window.QUESTIONS || [];
    const $ = (sel) => document.querySelector(sel);
    const editor = $('#editor');
    const state = { q: null, file: 'html', code: null };

    // ---------- localStorage (per-browser convenience; the page works without it) ----------
    const KEY = 'fe-sim:';
    const load = (k) => { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } };
    const save = (k, v) => { try { localStorage.setItem(KEY + k, v); } catch (e) { /* storage blocked */ } };
    const drop = (k) => { try { localStorage.removeItem(KEY + k); } catch (e) { /* storage blocked */ } };

    // ---------- tiny text helpers ----------
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

    function markdown(src) {
        let html = '', list = false, fence = null;
        for (const line of src.split('\n')) {
            if (line.startsWith('```')) {
                if (fence) { html += '<pre>' + esc(fence.join('\n')) + '</pre>'; fence = null; } else { fence = []; }
                continue;
            }
            if (fence) { fence.push(line); continue; }
            if (line.startsWith('- ')) {
                if (!list) { html += '<ul>'; list = true; }
                html += '<li>' + inline(line.slice(2)) + '</li>';
                continue;
            }
            if (list) { html += '</ul>'; list = false; }
            if (line.startsWith('#')) html += '<h3>' + inline(line.replace(/^#+\s*/, '')) + '</h3>';
            else if (line.trim()) html += '<p>' + inline(line) + '</p>';
        }
        return html + (list ? '</ul>' : '');
    }

    // ---------- build the Result document from the three tabs ----------
    // <base> keeps href="#x" links inside the iframe; the script records timers and errors for the tests.
    const PRELUDE = '<base href="about:srcdoc"><script>(function () {' +
        'var T = window.__timers = [], E = window.__errors = [], st = window.setTimeout, si = window.setInterval;' +
        'window.setTimeout = function (fn, d) { var id = st.apply(window, arguments); T.push({ kind: "timeout", fn: fn, delay: d, id: id }); return id; };' +
        'window.setInterval = function (fn, d) { var id = si.apply(window, arguments); T.push({ kind: "interval", fn: fn, delay: d, id: id }); return id; };' +
        'window.addEventListener("error", function (e) { E.push(e.message); parent.postMessage({ simError: e.message }, "*"); });' +
        '})();<\/script>';

    function compose(code) {
        const css = '<style>\n' + code.css + '\n</style>';
        const js = '<script>\n' + code.js.replace(/<\/script/gi, '<\\/script') + '\n<\/script>';
        const linkRe = /<link[^>]*href=["']style\.css["'][^>]*>/i;
        const scriptRe = /<script[^>]*src=["']script\.js["'][^>]*>\s*<\/script>/i;
        let html = code.html;
        html = linkRe.test(html) ? html.replace(linkRe, () => css) : css + html;
        html = scriptRe.test(html) ? html.replace(scriptRe, () => js) : html + js;
        return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + PRELUDE) : PRELUDE + html;
    }

    function run() {
        $('#consoleMsg').textContent = '';
        $('#result').srcdoc = compose(state.code);
    }

    window.addEventListener('message', (e) => {
        if (e.data && e.data.simError && e.source === $('#result').contentWindow) {
            $('#consoleMsg').textContent = '⚠ ' + e.data.simError;
        }
    });

    // ---------- test runner: every objective runs in its own fresh, hidden 1024x768 page ----------
    function makeApi(win) {
        const doc = win.document;
        const fail = (msg) => { throw new Error(msg); };
        return {
            win, doc,
            $: (s) => doc.querySelector(s),
            $$: (s) => Array.from(doc.querySelectorAll(s)),
            ok: (cond, msg) => { if (!cond) fail(msg); },
            need: (el, what) => el || fail(what + ' was not found'),
            css: (el, prop) => win.getComputedStyle(el)[prop],
            text: (el) => el.textContent.trim(),
            rect: (el) => el.getBoundingClientRect(),
            rgb: (hex) => { const n = parseInt(hex.slice(1), 16); return 'rgb(' + (n >> 16) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255) + ')'; },
            click: (el) => el.click(),
            type: (el, value) => {
                el.value = value;
                el.dispatchEvent(new win.Event('input', { bubbles: true }));
                el.dispatchEvent(new win.Event('change', { bubbles: true }));
            },
            submit: (form) => {
                const ev = new win.Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(ev);
                return ev;
            },
            wait: (ms) => new Promise((r) => setTimeout(r, ms)),
            timers: () => win.__timers || [],
            // Declared value of `prop` from a rule like `.btn:hover`, for the pseudo-class given (e.g. ':hover').
            pseudo: (el, pseudoClass, prop) => {
                let value = '';
                const walk = (rules) => {
                    for (const r of rules) {
                        if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; }
                        if (!r.selectorText) continue;
                        for (const part of r.selectorText.split(',')) {
                            if (!part.includes(pseudoClass)) continue;
                            const base = part.split(pseudoClass).join('').trim() || '*';
                            try { if (el.matches(base) && r.style[prop]) value = r.style[prop]; } catch (e) { /* odd selector */ }
                        }
                    }
                };
                for (const sheet of doc.styleSheets) walk(sheet.cssRules);
                return value;
            },
        };
    }

    function freshPage(html) {
        return new Promise((resolve) => {
            const frame = document.createElement('iframe');
            frame.className = 'test-frame';
            frame.addEventListener('load', () => resolve(frame), { once: true });
            frame.srcdoc = html;
            document.body.appendChild(frame);
        });
    }

    async function runSuite(q, code) {
        const html = compose(code);
        const results = [];
        for (const test of q.tests) {
            const frame = await freshPage(html);
            const win = frame.contentWindow;
            try {
                await Promise.race([
                    test(makeApi(win)),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timed out')), 6000)),
                ]);
                results.push({ pass: true });
            } catch (err) {
                const pageErrors = (win.__errors || []).length ? ' (page error: ' + win.__errors[0] + ')' : '';
                results.push({ pass: false, msg: ((err && err.message) || String(err)) + pageErrors });
            }
            frame.remove();
        }
        return results;
    }

    async function runTests() {
        const q = state.q;
        $('#testPanel').innerHTML = '<div class="panel"><h3>Running tests…</h3></div>';
        run();
        const results = await runSuite(q, state.code);
        const passed = results.filter((r) => r.pass).length;
        $('#testPanel').innerHTML = '<div class="panel"><h3>Test Results: ' + passed + ' / ' + results.length + ' objectives passed</h3>' +
            results.map((r, i) => '<div class="result-row"><span class="mark ' + (r.pass ? 'ok">&#10003;' : 'no">&#10007;') + '</span><span>' +
                inline(q.objectives[i] || 'Objective ' + (i + 1)) + (r.pass ? '' : '<span class="why">' + esc(r.msg) + '</span>') + '</span></div>').join('') +
            '</div>';
        save('score:' + q.id, passed + '/' + results.length);
        paintScore(q.id);
    }

    // ---------- UI ----------
    function paintScore(id) {
        const el = document.getElementById('score-' + id);
        const s = load('score:' + id);
        if (!el || !s) return;
        const [a, b] = s.split('/');
        el.textContent = s;
        el.className = 'score ' + (a === b ? 'full' : 'part');
    }

    function renderSidebar() {
        const groups = [['practice', 'Practice Questions'], ['pyq', 'PYQ / Reported Questions']];
        $('#sidebar').innerHTML = groups.map(([section, label]) =>
            '<div class="side-head">' + label + '</div>' +
            QUESTIONS.filter((q) => q.section === section).map((q) =>
                '<button class="side-item" data-id="' + q.id + '"><span class="qid">' + q.id + '</span><span>' + esc(q.title) +
                '</span><span class="score" id="score-' + q.id + '"></span></button>').join('')
        ).join('');
        QUESTIONS.forEach((q) => paintScore(q.id));
    }

    function renderQuestion(q) {
        const pyq = q.section === 'pyq';
        $('#question').innerHTML =
            '<span class="tag' + (pyq ? ' pyq' : '') + '">' + (pyq ? 'PYQ (reported)' : 'Practice') + '</span>' +
            '<h2>' + esc(q.id + ' — ' + q.title) + '</h2>' +
            '<h3>How to Attempt?</h3><p>' + inline(q.attempt) + '</p>' +
            '<h3>Objectives</h3><ul>' + q.objectives.map((o) => '<li>' + inline(o) + '</li>').join('') + '</ul>' +
            '<h3>Constraints</h3><ul>' + q.constraints.map((c) => '<li>' + inline(c) + '</li>').join('') + '</ul>' +
            '<p class="note">Use the editor on the right. "Show Solution" fills all three tabs with the solved version. ' +
            '"Reset Boilerplate" restores the exact starter code for the selected question. "Run Tests" checks every objective like the hidden test cases.</p>' +
            '<div id="testPanel"></div><div id="explainPanel"></div>';
    }

    function showFile(file) {
        state.file = file;
        document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.file === file));
        editor.value = state.code[file];
    }

    function select(id) {
        const q = QUESTIONS.find((x) => x.id === id) || QUESTIONS[0];
        state.q = q;
        state.code = {};
        ['html', 'css', 'js'].forEach((f) => { state.code[f] = load(q.id + ':' + f) ?? q.starter[f]; });
        save('last', q.id);
        document.querySelectorAll('.side-item').forEach((b) => b.classList.toggle('active', b.dataset.id === q.id));
        renderQuestion(q);
        showFile('html');
        run();
    }

    function fill(source) {
        ['html', 'css', 'js'].forEach((f) => { state.code[f] = source[f]; drop(state.q.id + ':' + f); });
        showFile(state.file);
        run();
    }

    // ---------- wiring ----------
    $('#sidebar').addEventListener('click', (e) => {
        const item = e.target.closest('.side-item');
        if (item) select(item.dataset.id);
    });
    document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => showFile(t.dataset.file)));
    editor.addEventListener('input', () => {
        state.code[state.file] = editor.value;
        save(state.q.id + ':' + state.file, editor.value);
    });
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            editor.setRangeText('    ', editor.selectionStart, editor.selectionEnd, 'end');
            editor.dispatchEvent(new Event('input'));
        } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            run();
        }
    });
    $('#runBtn').addEventListener('click', run);
    $('#testBtn').addEventListener('click', runTests);
    $('#resetBtn').addEventListener('click', () => {
        if (confirm('Reset all three tabs to the starter code? Your changes to this question will be lost.')) fill(state.q.starter);
    });
    $('#solutionBtn').addEventListener('click', () => {
        if (!confirm('Replace your code with the solution?')) return;
        fill(state.q.solution);
        $('#explainPanel').innerHTML = '<div class="panel">' + markdown(state.q.explanation) + '</div>';
    });

    // Used by the self-check: SIM.check() grades every starter and every solution.
    window.SIM = {
        compose, runSuite,
        check: async () => {
            const out = [];
            for (const q of QUESTIONS) {
                const s = await runSuite(q, q.solution);
                const b = await runSuite(q, q.starter);
                out.push({
                    id: q.id,
                    objectives: q.objectives.length,
                    tests: q.tests.length,
                    solution: s.filter((r) => r.pass).length,
                    starter: b.filter((r) => r.pass).length,
                    solutionFailures: s.map((r, i) => (r.pass ? null : i + 1 + ': ' + r.msg)).filter(Boolean),
                });
            }
            return out;
        },
    };

    if (!QUESTIONS.length) {
        $('#question').innerHTML = '<h2>No questions loaded</h2><p>Run <code>python3 _engine/build.py</code> in this folder, then reload.</p>';
        return;
    }
    renderSidebar();
    select(load('last'));
})();
