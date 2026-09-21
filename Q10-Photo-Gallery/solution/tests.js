// Q10: one test per objective, in order.
const TESTS = [
    async (t) => {
        const thumbs = t.$$('.thumbnails .thumb');
        t.ok(thumbs.length === 4, 'There must be 4 thumbnails, found ' + thumbs.length);
        const fourth = thumbs[3];
        t.ok(fourth.tagName === 'IMG', 'The fourth thumbnail must be an <img>');
        t.ok(fourth.getAttribute('src') === 'https://picsum.photos/id/40/480/300', 'The fourth thumbnail src must be https://picsum.photos/id/40/480/300, found ' + fourth.getAttribute('src'));
        t.ok(fourth.getAttribute('alt') === 'Photo 4', 'The fourth thumbnail alt must be "Photo 4", found ' + JSON.stringify(fourth.getAttribute('alt')));
    },
    async (t) => {
        const thumbs = t.$$('.thumbnails .thumb');
        t.ok(thumbs.length >= 2, 'Expected at least two thumbnails');
        for (let i = 0; i + 1 < thumbs.length; i++) {
            const a = t.rect(thumbs[i]);
            const b = t.rect(thumbs[i + 1]);
            t.ok(Math.abs(a.top - b.top) < 1, 'All thumbnails must be in a single row');
            const gap = Math.round(b.left - a.right);
            t.ok(gap === 10, 'The gap between thumbnails must be 10px, found ' + gap + 'px');
        }
    },
    async (t) => {
        const thumbs = t.$$('.thumbnails .thumb');
        thumbs.forEach((x) => x.classList.remove('active'));
        thumbs[1].classList.add('active');
        t.ok(t.css(thumbs[1], 'borderTopColor') === t.rgb('#ff6b00'), 'The active thumbnail must have the border color #ff6b00, found ' + t.css(thumbs[1], 'borderTopColor'));
        t.ok(t.css(thumbs[0], 'borderTopColor') !== t.rgb('#ff6b00'), 'Thumbnails without "active" must not have the orange border');
    },
    async (t) => {
        const thumbs = t.$$('.thumbnails .thumb');
        const main = t.need(t.$('#mainImage'), 'Image #mainImage');
        const caption = t.need(t.$('#caption'), 'Caption #caption');
        t.click(thumbs[2]);
        t.ok(main.src === thumbs[2].src, 'After clicking the 3rd thumbnail #mainImage must use its src, found ' + main.src);
        t.ok(main.alt === thumbs[2].alt, '#mainImage alt must be "' + thumbs[2].alt + '", found "' + main.alt + '"');
        t.ok(t.text(caption) === thumbs[2].alt, '#caption must read "' + thumbs[2].alt + '", found "' + t.text(caption) + '"');
    },
    async (t) => {
        const thumbs = t.$$('.thumbnails .thumb');
        const active = () => thumbs.map((x, i) => (x.classList.contains('active') ? i + 1 : 0)).filter(Boolean).join(',');
        t.click(thumbs[2]);
        t.ok(active() === '3', 'After clicking thumbnail 3 only it may be active, found active: ' + (active() || 'none'));
        t.click(thumbs[0]);
        t.ok(active() === '1', 'After clicking thumbnail 1 only it may be active, found active: ' + (active() || 'none'));
    },
];
