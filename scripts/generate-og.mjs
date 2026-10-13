// Generates public/og.png (1200x630) from the design tokens.
// Run with `npm run og` after changing the mark, the tokens or the tagline.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = (weight) =>
  readFile(`${root}node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-${weight}-normal.woff`);

const [regular, bold, mark] = await Promise.all([
  font(500),
  font(800),
  readFile(`${root}src/assets/ai-anvil-mark.png`),
]);
const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h(
  'div',
  {
    width: '1200px',
    height: '630px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '80px 88px',
    background: '#13102A',
    color: '#F3F0FF',
    fontFamily: 'Schibsted Grotesk',
  },
  [
    h('div', { display: 'flex', alignItems: 'center', gap: '22px' }, [
      { type: 'img', props: { src: markSrc, width: 98, height: 63, style: { width: '98px', height: '63px' } } },
      h('span', { fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em' }, 'AI Anvil'),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', gap: '32px', marginTop: 'auto' }, [
      h('div', { display: 'flex', flexDirection: 'column', fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.045em' }, [
        h('span', {}, 'Humans decide.'),
        h('span', {}, 'Agents carry.'),
      ]),
      h('div', { display: 'flex', gap: '8px' }, [
        h('div', { width: '160px', height: '8px', borderRadius: '4px', background: '#7AA2FF' }),
        h('div', { width: '160px', height: '8px', borderRadius: '4px', background: '#B8AAFF' }),
        h('div', { width: '160px', height: '8px', borderRadius: '4px', background: '#FFB347' }),
      ]),
    ]),
  ],
);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Schibsted Grotesk', data: regular, weight: 500, style: 'normal' },
    { name: 'Schibsted Grotesk', data: bold, weight: 800, style: 'normal' },
  ],
});
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
await writeFile(`${root}public/og.png`, png);
console.log('Wrote public/og.png');
