// Flat drawn pictograms. Each takes a centre, a size and an accent colour,
// and draws inside a box about s wide and s tall.
import { g, rect, circle, line, path, poly } from './kit.mjs';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

const D = {
  quake: (s, c) => [
    path(`M${-s / 2},${s * 0.1} L${-s * 0.3},${s * 0.1} L${-s * 0.22},${-s * 0.25} L${-s * 0.1},${s * 0.35} L${0},${-s * 0.4} L${s * 0.1},${s * 0.3} L${s * 0.2},${-s * 0.15} L${s * 0.28},${s * 0.1} L${s / 2},${s * 0.1}`, { fill: 'none', stroke: c, stroke_width: s * 0.07, stroke_linejoin: 'round' }),
    rect(-s / 2, s * 0.38, s, s * 0.08, { fill: INK, opacity: 0.5 }),
  ],
  ballot: (s, c) => [
    rect(-s * 0.38, -s * 0.05, s * 0.76, s * 0.45, { fill: c, rx: s * 0.04 }),
    rect(-s * 0.2, -s * 0.1, s * 0.4, s * 0.05, { fill: INK }),
    poly([[-s * 0.14, -s * 0.45], [s * 0.16, -s * 0.45], [s * 0.16, -s * 0.08], [-s * 0.14, -s * 0.08]], { fill: PAPER, stroke: INK, stroke_width: 1.2 }),
    path(`M${-s * 0.07},${-s * 0.27} l${s * 0.06},${s * 0.07} l${s * 0.1},${-s * 0.13}`, { fill: 'none', stroke: c, stroke_width: s * 0.05 }),
  ],
  drone: (s, c) => [
    rect(-s * 0.18, -s * 0.06, s * 0.36, s * 0.12, { fill: INK, rx: s * 0.05 }),
    poly([[-s * 0.45, 0], [s * 0.45, 0], [s * 0.05, -s * 0.12], [-s * 0.05, -s * 0.12]], { fill: c }),
    poly([[s * 0.18, 0], [s * 0.32, -s * 0.2], [s * 0.36, -s * 0.2], [s * 0.28, 0]], { fill: INK }),
    circle(0, s * 0.32, s * 0.08, { fill: '#e8742c' }),
    path(`M${-s * 0.25},${s * 0.4} q${s * 0.25},${-s * 0.2} ${s * 0.5},0`, { fill: 'none', stroke: '#e8742c', stroke_width: 2, opacity: 0.7 }),
  ],
  missile: (s, c) => [
    g({ transform: 'rotate(-35)' },
      rect(-s * 0.4, -s * 0.07, s * 0.65, s * 0.14, { fill: INK, rx: s * 0.06 }),
      poly([[s * 0.25, -s * 0.07], [s * 0.42, 0], [s * 0.25, s * 0.07]], { fill: c }),
      poly([[-s * 0.4, -s * 0.07], [-s * 0.48, -s * 0.18], [-s * 0.3, -s * 0.07]], { fill: c }),
      poly([[-s * 0.4, s * 0.07], [-s * 0.48, s * 0.18], [-s * 0.3, s * 0.07]], { fill: c }),
      circle(-s * 0.5, 0, s * 0.08, { fill: '#f2a03d' })),
  ],
  ship: (s, c) => [
    poly([[-s * 0.48, 0], [s * 0.48, 0], [s * 0.36, s * 0.2], [-s * 0.4, s * 0.2]], { fill: INK }),
    rect(-s * 0.3, -s * 0.2, s * 0.14, s * 0.2, { fill: c }),
    rect(-s * 0.14, -s * 0.2, s * 0.14, s * 0.2, { fill: '#e8742c' }),
    rect(s * 0.02, -s * 0.2, s * 0.14, s * 0.2, { fill: c, opacity: 0.7 }),
    rect(s * 0.22, -s * 0.34, s * 0.14, s * 0.34, { fill: PAPER, stroke: INK, stroke_width: 1 }),
    path(`M${-s / 2},${s * 0.3} q${s / 8},${-s * 0.06} ${s / 4},0 t${s / 4},0 t${s / 4},0 t${s / 4},0`, { fill: 'none', stroke: c, stroke_width: 2 }),
  ],
  chartUp: (s, c) => [
    line(-s * 0.42, s * 0.38, s * 0.42, s * 0.38, { stroke: INK, stroke_width: 1.5 }),
    ...[0.15, 0.28, 0.22, 0.4, 0.55].map((h, i) => rect(-s * 0.38 + i * s * 0.16, s * 0.38 - h * s, s * 0.11, h * s, { fill: i === 4 ? c : INK, opacity: i === 4 ? 1 : 0.35 })),
    path(`M${-s * 0.38},${s * 0.1} L${-s * 0.1},${-s * 0.02} L${s * 0.08},${s * 0.05} L${s * 0.38},${-s * 0.32}`, { fill: 'none', stroke: c, stroke_width: s * 0.06 }),
  ],
  chartDown: (s, c) => [
    line(-s * 0.42, s * 0.38, s * 0.42, s * 0.38, { stroke: INK, stroke_width: 1.5 }),
    path(`M${-s * 0.38},${-s * 0.3} L${-s * 0.12},${-s * 0.1} L${s * 0.06},${-s * 0.18} L${s * 0.36},${s * 0.24}`, { fill: 'none', stroke: c, stroke_width: s * 0.06 }),
    poly([[s * 0.38, s * 0.3], [s * 0.22, s * 0.26], [s * 0.36, s * 0.14]], { fill: c }),
  ],
  bank: (s, c) => [
    poly([[-s * 0.45, -s * 0.15], [0, -s * 0.42], [s * 0.45, -s * 0.15]], { fill: c }),
    ...[-0.32, -0.12, 0.08, 0.28].map((x) => rect(x * s, -s * 0.1, s * 0.07, s * 0.4, { fill: INK })),
    rect(-s * 0.45, s * 0.3, s * 0.9, s * 0.08, { fill: INK }),
    circle(0, -s * 0.24, s * 0.06, { fill: PAPER }),
  ],
  court: (s, c) => [
    g({ transform: 'rotate(-30)' },
      rect(-s * 0.3, -s * 0.3, s * 0.36, s * 0.18, { fill: c, rx: 2 }),
      rect(-s * 0.15, -s * 0.12, s * 0.06, s * 0.4, { fill: INK })),
    rect(-s * 0.1, s * 0.28, s * 0.5, s * 0.1, { fill: INK, rx: 2 }),
  ],
  ball: (s, c) => [
    circle(0, 0, s * 0.36, { fill: PAPER, stroke: INK, stroke_width: 2 }),
    poly([[0, -s * 0.12], [s * 0.11, -s * 0.04], [s * 0.07, s * 0.1], [-s * 0.07, s * 0.1], [-s * 0.11, -s * 0.04]], { fill: INK }),
    path(`M0,${-s * 0.12} L0,${-s * 0.34} M${s * 0.11},${-s * 0.04} L${s * 0.32},${-s * 0.12} M${s * 0.07},${s * 0.1} L${s * 0.2},${s * 0.29} M${-s * 0.07},${s * 0.1} L${-s * 0.2},${s * 0.29} M${-s * 0.11},${-s * 0.04} L${-s * 0.32},${-s * 0.12}`, { stroke: INK, stroke_width: 1.4 }),
    rect(-s * 0.48, s * 0.38, s * 0.96, s * 0.06, { fill: c }),
  ],
  hoop: (s, c) => [
    circle(-s * 0.1, s * 0.08, s * 0.24, { fill: '#e8742c', stroke: INK, stroke_width: 1.5 }),
    path(`M${-s * 0.34},${s * 0.08} h${s * 0.48} M${-s * 0.1},${-s * 0.16} v${s * 0.48}`, { stroke: INK, stroke_width: 1.2 }),
    rect(s * 0.18, -s * 0.42, s * 0.26, s * 0.2, { fill: PAPER, stroke: INK, stroke_width: 1.5 }),
    line(s * 0.14, -s * 0.2, s * 0.38, -s * 0.2, { stroke: c, stroke_width: 3 }),
  ],
  puck: (s, c) => [
    path(`M${-s * 0.4},${-s * 0.4} L${-s * 0.05},${s * 0.25} L${s * 0.25},${s * 0.25}`, { fill: 'none', stroke: INK, stroke_width: s * 0.08, stroke_linecap: 'round' }),
    rect(s * 0.05, s * 0.3, s * 0.32, s * 0.1, { fill: c, rx: s * 0.05 }),
    line(-s * 0.48, s * 0.44, s * 0.48, s * 0.44, { stroke: '#9cc7e0', stroke_width: 3 }),
  ],
  rocket: (s, c) => [
    path(`M0,${-s * 0.45} C${s * 0.14},${-s * 0.3} ${s * 0.14},${s * 0.1} ${s * 0.1},${s * 0.2} L${-s * 0.1},${s * 0.2} C${-s * 0.14},${s * 0.1} ${-s * 0.14},${-s * 0.3} 0,${-s * 0.45}Z`, { fill: PAPER, stroke: INK, stroke_width: 1.5 }),
    circle(0, -s * 0.15, s * 0.05, { fill: c }),
    poly([[-s * 0.1, s * 0.05], [-s * 0.22, s * 0.25], [-s * 0.1, s * 0.2]], { fill: c }),
    poly([[s * 0.1, s * 0.05], [s * 0.22, s * 0.25], [s * 0.1, s * 0.2]], { fill: c }),
    poly([[-s * 0.07, s * 0.22], [0, s * 0.46], [s * 0.07, s * 0.22]], { fill: '#f2a03d' }),
  ],
  plane: (s, c) => [
    g({ transform: 'rotate(-15)' },
      rect(-s * 0.45, -s * 0.05, s * 0.9, s * 0.1, { fill: INK, rx: s * 0.05 }),
      poly([[-s * 0.05, 0], [s * 0.1, 0], [-s * 0.12, -s * 0.38], [-s * 0.2, -s * 0.38]], { fill: c }),
      poly([[-s * 0.05, 0], [s * 0.1, 0], [-s * 0.12, s * 0.38], [-s * 0.2, s * 0.38]], { fill: c }),
      poly([[-s * 0.4, 0], [-s * 0.32, 0], [-s * 0.42, -s * 0.18], [-s * 0.47, -s * 0.18]], { fill: c })),
  ],
  flame: (s, c) => [
    path(`M0,${-s * 0.45} C${s * 0.3},${-s * 0.15} ${s * 0.35},${s * 0.1} ${s * 0.2},${s * 0.3} C${s * 0.1},${s * 0.42} ${-s * 0.1},${s * 0.42} ${-s * 0.2},${s * 0.3} C${-s * 0.35},${s * 0.1} ${-s * 0.15},${-s * 0.1} 0,${-s * 0.45}Z`, { fill: '#e8742c' }),
    path(`M0,${-s * 0.05} C${s * 0.15},${s * 0.1} ${s * 0.12},${s * 0.35} 0,${s * 0.36} C${-s * 0.12},${s * 0.35} ${-s * 0.12},${s * 0.15} 0,${-s * 0.05}Z`, { fill: '#f6d04d' }),
    rect(-s * 0.4, s * 0.38, s * 0.8, s * 0.06, { fill: c }),
  ],
  storm: (s, c) => [
    path(`M${-s * 0.35},${s * 0.05} a${s * 0.14},${s * 0.14} 0 0 1 ${s * 0.1},${-s * 0.25} a${s * 0.2},${s * 0.2} 0 0 1 ${s * 0.38},${-s * 0.04} a${s * 0.13},${s * 0.13} 0 0 1 ${s * 0.12},${s * 0.29}Z`, { fill: INK, opacity: 0.75 }),
    poly([[s * 0.02, s * 0.05], [-s * 0.1, s * 0.25], [0, s * 0.25], [-s * 0.08, s * 0.45], [s * 0.14, s * 0.18], [s * 0.04, s * 0.18], [s * 0.12, s * 0.05]], { fill: '#f6d04d' }),
    ...[-0.28, 0.24].map((x) => line(x * s, s * 0.12, x * s - s * 0.06, s * 0.32, { stroke: c, stroke_width: 2.5 })),
  ],
  leaf: (s, c) => [
    path(`M${-s * 0.35},${s * 0.35} C${-s * 0.4},${-s * 0.2} ${0},${-s * 0.42} ${s * 0.4},${-s * 0.4} C${s * 0.38},${0} ${s * 0.1},${s * 0.38} ${-s * 0.35},${s * 0.35}Z`, { fill: c }),
    path(`M${-s * 0.35},${s * 0.35} L${s * 0.3},${-s * 0.3}`, { stroke: PAPER, stroke_width: 2 }),
  ],
  health: (s, c) => [
    circle(0, 0, s * 0.4, { fill: c }),
    rect(-s * 0.08, -s * 0.26, s * 0.16, s * 0.52, { fill: PAPER }),
    rect(-s * 0.26, -s * 0.08, s * 0.52, s * 0.16, { fill: PAPER }),
  ],
  chip: (s, c) => [
    rect(-s * 0.26, -s * 0.26, s * 0.52, s * 0.52, { fill: INK, rx: 3 }),
    rect(-s * 0.13, -s * 0.13, s * 0.26, s * 0.26, { fill: c }),
    ...[-0.16, 0, 0.16].flatMap((k) => [
      line(k * s, -s * 0.26, k * s, -s * 0.4, { stroke: INK, stroke_width: 2 }),
      line(k * s, s * 0.26, k * s, s * 0.4, { stroke: INK, stroke_width: 2 }),
      line(-s * 0.26, k * s, -s * 0.4, k * s, { stroke: INK, stroke_width: 2 }),
      line(s * 0.26, k * s, s * 0.4, k * s, { stroke: INK, stroke_width: 2 }),
    ]),
  ],
  podium: (s, c) => [
    rect(-s * 0.3, -s * 0.05, s * 0.6, s * 0.43, { fill: c }),
    rect(-s * 0.36, -s * 0.1, s * 0.72, s * 0.07, { fill: INK }),
    line(-s * 0.05, -s * 0.1, -s * 0.15, -s * 0.36, { stroke: INK, stroke_width: 2 }),
    circle(-s * 0.16, -s * 0.38, s * 0.05, { fill: INK }),
    circle(0, s * 0.15, s * 0.08, { fill: PAPER }),
  ],
  coin: (s, c) => [
    circle(s * 0.08, s * 0.08, s * 0.3, { fill: INK, opacity: 0.3 }),
    circle(0, 0, s * 0.3, { fill: c, stroke: INK, stroke_width: 1.5 }),
    circle(0, 0, s * 0.2, { fill: 'none', stroke: PAPER, stroke_width: 1.5 }),
  ],
  oil: (s, c) => [
    rect(-s * 0.22, -s * 0.3, s * 0.44, s * 0.68, { fill: c, rx: s * 0.06 }),
    ...[-0.12, 0.12].map((y) => rect(-s * 0.24, y * s, s * 0.48, s * 0.05, { fill: INK })),
    path(`M${s * 0.3},${-s * 0.35} c${s * 0.08},${s * 0.1} ${s * 0.08},${s * 0.16} 0,${s * 0.2} c${-s * 0.08},${-s * 0.04} ${-s * 0.08},${-s * 0.1} 0,${-s * 0.2}Z`, { fill: INK }),
  ],
  ribbon: (s, c) => [
    path(`M0,${-s * 0.05} C${-s * 0.3},${-s * 0.3} ${-s * 0.1},${-s * 0.48} 0,${-s * 0.3} C${s * 0.1},${-s * 0.48} ${s * 0.3},${-s * 0.3} 0,${-s * 0.05}Z`, { fill: 'none', stroke: c, stroke_width: s * 0.1 }),
    path(`M0,${-s * 0.05} L${-s * 0.2},${s * 0.4} M0,${-s * 0.05} L${s * 0.2},${s * 0.4}`, { stroke: c, stroke_width: s * 0.1 }),
  ],
  dove: (s, c) => [
    path(`M${-s * 0.42},${0} C${-s * 0.2},${-s * 0.1} ${0},${-s * 0.05} ${s * 0.15},${-s * 0.12} L${s * 0.35},${-s * 0.18} L${s * 0.25},${-s * 0.06} C${s * 0.2},${s * 0.15} ${-s * 0.1},${s * 0.2} ${-s * 0.42},${0}Z`, { fill: PAPER, stroke: INK, stroke_width: 1.5 }),
    path(`M${-s * 0.1},${-s * 0.05} C${-s * 0.05},${-s * 0.4} ${s * 0.1},${-s * 0.42} ${s * 0.12},${-s * 0.4} C${s * 0.05},${-s * 0.2} ${s * 0.05},${-s * 0.1} ${-s * 0.1},${-s * 0.05}Z`, { fill: c }),
  ],
  shield: (s, c) => [
    path(`M0,${-s * 0.42} L${s * 0.34},${-s * 0.28} C${s * 0.34},${s * 0.1} ${s * 0.2},${s * 0.3} 0,${s * 0.42} C${-s * 0.2},${s * 0.3} ${-s * 0.34},${s * 0.1} ${-s * 0.34},${-s * 0.28}Z`, { fill: c }),
    path(`M${-s * 0.12},0 l${s * 0.1},${s * 0.1} l${s * 0.16},${-s * 0.2}`, { fill: 'none', stroke: PAPER, stroke_width: s * 0.07 }),
  ],
  globe: (s, c) => [
    circle(0, 0, s * 0.38, { fill: c }),
    path(`M${-s * 0.38},0 h${s * 0.76} M0,${-s * 0.38} v${s * 0.76} M${-s * 0.33},${-s * 0.18} h${s * 0.66} M${-s * 0.33},${s * 0.18} h${s * 0.66}`, { stroke: PAPER, stroke_width: 1.2, opacity: 0.8 }),
    path(`M0,${-s * 0.38} c${s * 0.22},${s * 0.2} ${s * 0.22},${s * 0.56} 0,${s * 0.76} c${-s * 0.22},${-s * 0.2} ${-s * 0.22},${-s * 0.56} 0,${-s * 0.76}`, { fill: 'none', stroke: PAPER, stroke_width: 1.2, opacity: 0.8 }),
  ],
  train: (s, c) => [
    rect(-s * 0.3, -s * 0.36, s * 0.6, s * 0.6, { fill: c, rx: s * 0.1 }),
    rect(-s * 0.2, -s * 0.26, s * 0.4, s * 0.2, { fill: PAPER }),
    circle(-s * 0.15, s * 0.1, s * 0.05, { fill: '#f6d04d' }),
    circle(s * 0.15, s * 0.1, s * 0.05, { fill: '#f6d04d' }),
    path(`M${-s * 0.2},${s * 0.26} L${-s * 0.32},${s * 0.42} M${s * 0.2},${s * 0.26} L${s * 0.32},${s * 0.42}`, { stroke: INK, stroke_width: 2 }),
  ],
  film: (s, c) => [
    rect(-s * 0.4, -s * 0.24, s * 0.8, s * 0.48, { fill: INK, rx: 3 }),
    rect(-s * 0.3, -s * 0.15, s * 0.6, s * 0.3, { fill: c }),
    ...[-0.34, -0.2, -0.06, 0.08, 0.22, 0.36].map((x) => rect(x * s - 2, -s * 0.22, 4, 3, { fill: PAPER })),
  ],
  megaphone: (s, c) => [
    poly([[-s * 0.3, -s * 0.08], [s * 0.3, -s * 0.32], [s * 0.3, s * 0.32], [-s * 0.3, s * 0.08]], { fill: c }),
    rect(-s * 0.42, -s * 0.1, s * 0.14, s * 0.2, { fill: INK }),
    rect(-s * 0.22, s * 0.1, s * 0.08, s * 0.24, { fill: INK }),
  ],
  turkey: (s, c) => [
    ...[-60, -30, 0, 30, 60].map((a) => g({ transform: `rotate(${a})` }, path(`M0,0 L${-s * 0.08},${-s * 0.4} L${s * 0.08},${-s * 0.4}Z`, { fill: a % 60 ? c : '#e8742c' }))),
    circle(0, s * 0.08, s * 0.2, { fill: '#8a5a3a' }),
    circle(0, -s * 0.12, s * 0.09, { fill: '#8a5a3a' }),
    poly([[s * 0.08, -s * 0.12], [s * 0.18, -s * 0.09], [s * 0.08, -s * 0.06]], { fill: '#f2a03d' }),
  ],
  tank: (s, c) => [
    rect(-s * 0.42, s * 0.06, s * 0.84, s * 0.22, { fill: INK, rx: s * 0.1 }),
    rect(-s * 0.32, -s * 0.1, s * 0.6, s * 0.18, { fill: c, rx: 3 }),
    rect(-s * 0.14, -s * 0.24, s * 0.3, s * 0.16, { fill: c, rx: 3 }),
    rect(s * 0.14, -s * 0.2, s * 0.32, s * 0.05, { fill: INK }),
  ],
  key: (s, c) => [
    circle(-s * 0.2, 0, s * 0.16, { fill: 'none', stroke: c, stroke_width: s * 0.08 }),
    path(`M${-s * 0.05},0 H${s * 0.4} M${s * 0.28},0 v${s * 0.14} M${s * 0.38},0 v${s * 0.1}`, { stroke: c, stroke_width: s * 0.08 }),
  ],
};

export const KINDS = Object.keys(D);

export function glyph(kind, cx, cy, s, color) {
  const f = D[kind] || D.globe;
  return g({ transform: `translate(${cx.toFixed(1)},${cy.toFixed(1)})` }, f(s, color));
}
