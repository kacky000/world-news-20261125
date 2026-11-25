// Composes the one-page front page as an SVG inside art/front-page.html.
import { writeFileSync } from 'node:fs';
import { g, rect, circle, line, path, text, para, measure, tag, esc } from './kit.mjs';
import { glyph } from './glyphs.mjs';
import { dotMap } from './dotmap.mjs';
import { DAY, LEADS, CARDS, BRIEFS, DATECHECK, SOURCES } from './stories.mjs';

const W = 1024;
const H = 1024;

export const REGION = {
  'Asia': '#c8372d',
  'Oceania': '#13827f',
  'Middle East': '#c98516',
  'Africa': '#5f8a24',
  'Europe': '#2b58a3',
  'North America': '#74419a',
  'Latin America': '#cf4f7d',
};

export const SURE = {
  CONFIRMED: { c: '#1d7a3b', short: 'CONF', note: 'seen, several reports' },
  OFFICIAL: { c: '#2b58a3', short: 'OFFL', note: 'agency or govt statement' },
  REPORTED: { c: '#5d626c', short: 'REPT', note: 'one outlet so far' },
  CLAIM: { c: '#b25a14', short: 'CLAIM', note: 'a party says so' },
  FORECAST: { c: '#8456b8', short: 'SCHED', note: 'set for today, not yet run' },
};

const ALL = [...LEADS, ...CARDS, ...BRIEFS];
ALL.forEach((s, i) => (s.n = i + 1));
const fields = new Set(ALL.map((s) => s.field));
const regions = new Set(ALL.map((s) => s.region));

const chip = (x, y, s) => {
  const t = SURE[s.sure];
  const label = `${s.sure} · ${s.src}`;
  const w = measure(label, 8.6, 'headc') + 12;
  return {
    w,
    svg: g(
      {},
      rect(x, y - 9.5, w, 13, { rx: 2.5, fill: s.sure === 'FORECAST' ? 'var(--paper)' : t.c, stroke: t.c, stroke_width: 1.1, stroke_dasharray: s.sure === 'FORECAST' ? '3 1.6' : undefined }),
      text(x + 6, y, label, { size: 8.6, weight: 700, kind: 'headc', fill: s.sure === 'FORECAST' ? t.c : '#fff', spacing: 0.3 }),
    ),
  };
};

// ── Masthead ────────────────────────────────────────────────
function masthead() {
  const out = [];
  out.push(rect(0, 0, W, 8, { fill: 'var(--ink)' }));
  out.push(text(22, 38, DAY.weekday.toUpperCase(), { size: 21, weight: 700, kind: 'head', spacing: 6, fill: 'var(--red)' }));
  out.push(text(W / 2, 124, DAY.dateline, { size: 112, weight: 700, kind: 'head', anchor: 'middle', spacing: -1 }));
  // right of the weekday: the edition line
  out.push(rect(560, 18, 444, 26, { fill: 'var(--ink)', rx: 3 }));
  out.push(text(572, 35.5, 'THE WHOLE WORLD · ONE DAY', { size: 10.5, weight: 700, kind: 'head', fill: '#f6d04d', spacing: 1 }));
  out.push(text(994, 35.5, `UTC day ${DAY.iso} 00:00–23:59 · edition ${DAY.closed}`, { size: 10.5, fill: '#fff', anchor: 'end' }));
  const strap = `${ALL.length} STORIES · ${regions.size} REGIONS · ${fields.size} FIELDS · EVERY ONE FROM THIS ${DAY.weekday.toUpperCase()}`;
  out.push(rect(0, 132, W, 26, { fill: 'var(--red)' }));
  out.push(text(W / 2, 150.5, strap, { size: 15.5, weight: 700, kind: 'head', fill: '#fff', anchor: 'middle', spacing: 1.4 }));
  return out;
}

// ── The day in UTC ──────────────────────────────────────────
function utcStrip() {
  const x0 = 116, x1 = 1004, y = 191;
  const X = (h) => x0 + ((x1 - x0) * h) / 24;
  const out = [];
  out.push(text(22, 180, 'THE DAY', { size: 12, weight: 700, kind: 'head', spacing: 1 }));
  out.push(text(22, 194, 'IN UTC', { size: 12, weight: 700, kind: 'head', spacing: 1, fill: 'var(--red)' }));
  out.push(rect(x0, y - 3, x1 - x0, 6, { fill: 'var(--rule)', rx: 3 }));
  for (let h = 0; h <= 24; h += 3) {
    out.push(line(X(h), y - 7, X(h), y + 7, { stroke: 'var(--ink)', stroke_width: 1 }));
    out.push(text(X(h), y + 16, `${String(h).padStart(2, '0')}:00`, { size: 8, anchor: 'middle', fill: 'var(--mute)' }));
  }
  const timed = ALL.filter((s) => s.t).sort((a, b) => a.t.localeCompare(b.t));
  // three label rows: two above the line, one below the hour marks
  const ROWS = [y - 10, y - 21, y + 27];
  const rowEnd = [-99, -99, -99];
  for (const s of timed) {
    const [hh, mm] = s.t.split(':').map(Number);
    const x = X(hh + mm / 60);
    const lbl = `${s.t} ${s.tl || ''}`.trim();
    const w = measure(lbl, 8.4, 'headc');
    let r = rowEnd.findIndex((end) => x - 3 > end + 6);
    if (r < 0) r = rowEnd.indexOf(Math.min(...rowEnd));
    rowEnd[r] = x - 3 + w;
    out.push(line(x, y, x, ROWS[r] + (r === 2 ? -8 : 2), { stroke: REGION[s.region], stroke_width: 0.8 }));
    out.push(circle(x, y, 5.5, { fill: REGION[s.region], stroke: 'var(--paper)', stroke_width: 1.2 }));
    out.push(text(x, y + 3, s.n, { size: 7, weight: 700, anchor: 'middle', fill: '#fff', kind: 'headc' }));
    out.push(text(x - 3, ROWS[r], lbl, { size: 8.4, weight: 600, kind: 'headc', fill: 'var(--ink)' }));
  }
  return out;
}

// ── Lead stories with drawn scenes ──────────────────────────
function scene(s, x, y, w, h) {
  const c = REGION[s.region];
  const p = s.pic;
  const out = [];
  out.push(rect(x, y, w, h, { fill: c, opacity: 0.13 }));
  out.push(rect(x, y + h - 26, w, 26, { fill: c, opacity: 0.22 }));
  // sun/moon disc behind the subject
  out.push(circle(x + w * 0.3, y + h * 0.45, h * 0.34, { fill: '#fff', opacity: 0.55 }));
  out.push(glyph(p.main, x + w * 0.3, y + h * 0.48, h * 0.78, c));
  (p.side || []).forEach((k, i) => out.push(glyph(k, x + w * 0.62 + i * w * 0.18, y + h * 0.7, h * 0.36, c)));
  if (p.big) {
    out.push(text(x + w - 10, y + h * 0.36, p.big, { size: 30, weight: 700, kind: 'head', anchor: 'end', fill: c }));
    if (p.bigNote) out.push(text(x + w - 10, y + h * 0.36 + 14, p.bigNote, { size: 9.5, anchor: 'end', fill: 'var(--ink)', weight: 600 }));
  }
  out.push(rect(x + 6, y + 6, 22, 18, { fill: 'var(--ink)', rx: 2 }));
  out.push(text(x + 17, y + 19, s.n, { size: 12, weight: 700, anchor: 'middle', fill: '#fff', kind: 'head' }));
  out.push(text(x + 34, y + 19, `${s.place.toUpperCase()} · ${s.region.toUpperCase()}`, { size: 9.5, weight: 700, kind: 'head', fill: c, spacing: 0.6 }));
  return out;
}

function leads() {
  const out = [];
  const y = 222, h = 262, gap = 14, w = (W - 44 - gap * (LEADS.length - 1)) / LEADS.length;
  LEADS.forEach((s, i) => {
    const x = 22 + i * (w + gap);
    out.push(scene(s, x, y, w, 128));
    out.push(chip(x, y + 146, s).svg);
    if (s.t) out.push(text(x + w, y + 146, `${s.t} UTC`, { size: 9.5, weight: 700, anchor: 'end', kind: 'headc', fill: 'var(--mute)' }));
    const hd = para(x, y + 168, s.head, w, { size: 17.5, weight: 700, kind: 'head', lead: 1.12, maxLines: 2 });
    out.push(hd.svg);
    out.push(para(x, y + 172 + hd.height, s.text, w, { size: 11.2, lead: 1.3, maxLines: 4, fill: '#2b2f37' }).svg);
    out.push(line(x, y + h, x + w, y + h, { stroke: 'var(--rule)' }));
  });
  return out;
}

// ── Drawn cards ─────────────────────────────────────────────
function cards() {
  const out = [];
  const cols = 6, x0 = 22, y0 = 498, gap = 8, w = (W - 44 - gap * (cols - 1)) / cols, h = 98;
  CARDS.forEach((s, i) => {
    const x = x0 + (i % cols) * (w + gap);
    const y = y0 + Math.floor(i / cols) * (h + gap);
    const c = REGION[s.region];
    out.push(rect(x, y, w, h, { fill: '#fff', stroke: 'var(--rule)', rx: 3 }));
    out.push(rect(x, y, w, 4, { fill: c }));
    out.push(rect(x + 5, y + 9, 40, 40, { fill: c, opacity: 0.14, rx: 3 }));
    out.push(glyph(s.icon, x + 25, y + 29, 34, c));
    out.push(text(x + 50, y + 18, `${s.n}`, { size: 13, weight: 700, kind: 'head', fill: c }));
    out.push(text(x + 50 + measure(`${s.n}`, 13, 'head') + 4, y + 18, s.place.toUpperCase(), { size: 8.2, weight: 700, kind: 'headc', fill: 'var(--mute)' }));
    out.push(para(x + 50, y + 31, s.head, w - 54, { size: 10.6, weight: 700, kind: 'headc', lead: 1.12, maxLines: 2 }).svg);
    out.push(para(x + 6, y + 64, s.text, w - 12, { size: 9, lead: 1.2, maxLines: 2, fill: '#3a3e47' }).svg);
    const ch = chip(x + 5, y + h - 4, s);
    out.push(ch.svg);
  });
  return out;
}

// ── Numbered briefs ─────────────────────────────────────────
function briefs() {
  const out = [];
  const x0 = 372, y0 = 726, colW = 316, rowH = Math.min(15.6, 208 / Math.ceil(BRIEFS.length / 2));
  const per = Math.ceil(BRIEFS.length / 2);
  out.push(text(x0, 722, 'ALSO TODAY', { size: 12.5, weight: 700, kind: 'head', spacing: 1.5 }));
  out.push(text(x0 + 92, 722, `numbered briefs ${BRIEFS[0].n}–${BRIEFS.at(-1).n} · tag · source`, { size: 10, fill: 'var(--mute)' }));
  out.push(line(x0, 727, W - 22, 727, { stroke: 'var(--ink)', stroke_width: 1.4 }));
  BRIEFS.forEach((s, i) => {
    const col = Math.floor(i / per);
    const x = x0 + col * (colW + 14);
    const y = y0 + 13 + (i % per) * rowH;
    const t = SURE[s.sure];
    out.push(text(x + 14, y, s.n, { size: 9.5, weight: 700, anchor: 'end', kind: 'headc' }));
    out.push(circle(x + 20, y - 3.3, 3.2, { fill: REGION[s.region] }));
    out.push(text(x + 27, y, t.short, { size: 7.6, weight: 700, kind: 'headc', fill: t.c }));
    let body = s.head;
    const room = colW - 58 - measure(s.src, 8, 'headc');
    while (measure(body, 9.6, 'headc') > room && body.length > 8) body = body.replace(/\s*\S+$/, '') + '…';
    out.push(text(x + 54, y, body.replace(/……$/, '…'), { size: 9.6, kind: 'headc', weight: 600 }));
    out.push(text(x + colW, y, s.src, { size: 8, kind: 'headc', anchor: 'end', fill: 'var(--mute)' }));
  });
  return out;
}

// ── Map, legend, date check ─────────────────────────────────
function lowerLeft() {
  const out = [];
  out.push(text(22, 722, 'WHERE', { size: 12.5, weight: 700, kind: 'head', spacing: 1.5 }));
  out.push(text(72, 722, 'pins = story numbers', { size: 10, fill: 'var(--mute)' }));
  const pins = [...LEADS, ...CARDS].map((s) => ({ n: s.n, lat: s.lat, lon: s.lon, color: REGION[s.region] }));
  out.push(dotMap(22, 727, 336, 158, pins));
  // region key
  Object.entries(REGION).forEach(([name, c], i) => {
    const n = ALL.filter((s) => s.region === name).length;
    const kx = 22 + (i % 4) * 86;
    const ky = 895 + Math.floor(i / 4) * 11;
    out.push(circle(kx + 4, ky - 3.2, 3.4, { fill: c }));
    out.push(text(kx + 10, ky, `${name} ${n}`, { size: 8.4, kind: 'headc', weight: 600 }));
  });
  // how sure
  out.push(text(22, 918, 'HOW SURE', { size: 11.5, weight: 700, kind: 'head', spacing: 1.2 }));
  let hx = 92;
  Object.entries(SURE).forEach(([k, v], i) => {
    const count = ALL.filter((s) => s.sure === k).length;
    const lx = i < 3 ? 92 + i * 92 : 92 + (i - 3) * 132;
    const ly = i < 3 ? 917 : 930;
    out.push(rect(lx, ly - 7.5, 7, 7, { fill: k === 'FORECAST' ? 'var(--paper)' : v.c, stroke: v.c, stroke_dasharray: k === 'FORECAST' ? '2 1' : undefined }));
    out.push(text(lx + 10, ly - 0.5, `${k} ${count}`, { size: 8.4, weight: 700, kind: 'headc', fill: v.c }));
    hx = lx;
  });
  out.push(text(22, 944, 'Tag = what the dated report shows; SCHED = on today’s official calendar.', { size: 8.2, fill: 'var(--mute)' }));
  return out;
}

function dateCheck() {
  const out = [];
  const x = 22, y = 962, w = W - 44;
  out.push(rect(x, y - 12, w, 16 + Math.ceil(DATECHECK.length / 3) * 13, { fill: 'var(--ink)', opacity: 0.05 }));
  out.push(text(x + 6, y, 'DATE CHECK — LEFT OUT, NOT FROM ' + DAY.short.toUpperCase() + ':', { size: 10, weight: 700, kind: 'head', fill: 'var(--red)', spacing: 0.6 }));
  DATECHECK.forEach((d, i) => {
    const cx = x + 6 + (i % 3) * (w / 3);
    const cy = y + 14 + Math.floor(i / 3) * 13;
    out.push(text(cx, cy, `✕ ${d.when}`, { size: 8.8, weight: 700, kind: 'headc', fill: 'var(--red)' }));
    out.push(text(cx + 48, cy, d.what, { size: 8.8, kind: 'headc', fill: 'var(--ink)' }));
  });
  return out;
}

function footer() {
  return [
    rect(0, H - 18, W, 18, { fill: 'var(--ink)' }),
    text(22, H - 5.5, `SOURCES: ${SOURCES}`, { size: 8.6, fill: '#d9dce3', kind: 'headc' }),
  ];
}

const svg = tag(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', width: W, height: H, viewBox: `0 0 ${W} ${H}` },
  rect(0, 0, W, H, { fill: 'var(--paper)' }),
  masthead(),
  utcStrip(),
  leads(),
  cards(),
  lowerLeft(),
  briefs(),
  dateCheck(),
  footer(),
);

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(DAY.dateline)}</title>
<style>
:root{--paper:#f5f0e6;--ink:#191c23;--red:#c22f26;--rule:#d6cfc0;--mute:#6b6f78;--land:#b9b09c;--sea:#e9e3d6}
html,body{margin:0;padding:0;background:#f5f0e6;width:${W}px;height:${H}px;overflow:hidden}
svg{display:block}
.n{font-stretch:75%;font-variation-settings:'wdth' 75}
</style></head><body>${svg}</body></html>`;

writeFileSync(new URL('./front-page.html', import.meta.url), html);
console.log(`stories ${ALL.length} · regions ${regions.size} · fields ${fields.size}`);
