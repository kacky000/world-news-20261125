// Tiny SVG string kit: elements, escaping, text measuring and wrapping.

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const attrs = (a = {}) =>
  Object.entries(a)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k.replace(/_/g, '-')}="${esc(v)}"`)
    .join('');

export const tag = (name, a, ...kids) =>
  kids.length ? `<${name}${attrs(a)}>${kids.flat(Infinity).join('')}</${name}>` : `<${name}${attrs(a)}/>`;

export const g = (a, ...kids) => tag('g', a, ...kids);
export const rect = (x, y, w, h, a = {}) => tag('rect', { x, y, width: w, height: h, ...a });
export const circle = (cx, cy, r, a = {}) => tag('circle', { cx, cy, r, ...a });
export const line = (x1, y1, x2, y2, a = {}) => tag('line', { x1, y1, x2, y2, ...a });
export const path = (d, a = {}) => tag('path', { d, ...a });
export const poly = (pts, a = {}) => tag('polygon', { points: pts.map((p) => p.join(',')).join(' '), ...a });

// Font families used on the page.
export const FONT = {
  head: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
  body: '"Segoe UI", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
};

// Average glyph width as a share of font size, per family/stretch.
const WIDTH = { head: 0.56, headc: 0.465, body: 0.53, serif: 0.55 };

export const measure = (s, size, kind = 'body') => [...String(s)].length * size * (WIDTH[kind] ?? 0.53);

export function text(x, y, s, o = {}) {
  const { size = 12, kind = 'body', fill = 'var(--ink)', weight = 400, anchor = 'start', spacing, cond = false, style } = o;
  const narrow = cond || kind === 'headc';
  const fam = kind === 'serif' ? FONT.serif : narrow ? `"Bahnschrift Condensed", ${FONT.head}` : kind.startsWith('head') ? FONT.head : FONT.body;
  return tag(
    'text',
    {
      x,
      y,
      font_family: fam,
      font_size: size,
      font_weight: weight,
      fill,
      text_anchor: anchor,
      letter_spacing: spacing,
      class: narrow ? 'n' : undefined,
      font_style: style,
    },
    esc(s),
  );
}

// Greedy word wrap by estimated width.
export function wrap(s, width, size, kind = 'body', maxLines = 9) {
  const words = String(s).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (measure(next, size, kind) > width && cur) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

export function para(x, y, s, width, o = {}) {
  const { size = 12, lead = 1.22, kind = 'body', maxLines = 9 } = o;
  const lines = wrap(s, width, size, kind, maxLines);
  return {
    svg: lines.map((ln, i) => text(x, y + i * size * lead, ln, o)).join(''),
    height: lines.length * size * lead,
    lines: lines.length,
  };
}
