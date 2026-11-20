import { narrowQuery, reduceMotion } from './media.js';

// Road engine: draws a winding path down each registered road and moves a
// light along it as the reader scrolls. Stops light up as the light reaches
// them. One animation loop is shared by every road on the page.
//
// Desktop: a central spine that swings toward each stop's card.
// Phones: stops alternate their inset, and the path flows from one side's lane
// to the other in long S-curves that pass behind the cards.

const roads = new Set();
let cur = 0;
let raf = 0;
let resizeObserver = null;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const markY = () => window.scrollY + window.innerHeight * 0.6;
const docTop = (el) => { // layout position, ignoring transforms
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
};
const C = (x1, y1, x2, y2, x, y) => ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;

function measure(r) {
  const W = r.road.offsetWidth;
  const H = r.road.offsetHeight;
  const cards = r.stops.map((s) => s.querySelector('.stop-card'));
  if (!cards.length || !cards[0]) return;
  r.top = docTop(r.road);
  const startY = -20;
  const endY = H + 24;
  let pts;
  let d;

  if (narrowQuery.matches) {
    const lane = cards[0].offsetLeft;
    const xL = lane / 2;
    const xR = W - lane / 2;
    pts = cards.map((card, i) => {
      const left = i % 2 === 0;
      return {
        x: left ? xL : xR,
        y: card.offsetTop + 24,
        edge: left ? card.offsetLeft : card.offsetLeft + card.offsetWidth,
      };
    });
    d = `M ${pts[0].x} ${startY} L ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const dy = b.y - a.y;
      d += C(a.x, a.y + dy * 0.5, b.x, b.y - dy * 0.5, b.x, b.y);
    }
    d += ` L ${pts[pts.length - 1].x} ${endY}`;
  } else {
    const spine = W - 2 * cards[0].offsetWidth;
    const cx = W / 2;
    const amp = Math.max(8, Math.min(88, spine / 2 - 22));
    pts = cards.map((card, i) => {
      const cardLeft = i % 2 === 0;
      return {
        x: cx + (cardLeft ? -amp : amp),
        y: card.offsetTop + 30,
        edge: cardLeft ? card.offsetLeft + card.offsetWidth : card.offsetLeft,
      };
    });
    d = `M ${cx} ${startY}`;
    let prev = { x: cx, y: startY };
    pts.forEach((p) => {
      const dy = p.y - prev.y;
      d += C(prev.x, prev.y + dy * 0.5, p.x, p.y - dy * 0.5, p.x, p.y);
      prev = p;
    });
    const dyEnd = endY - prev.y;
    d += C(prev.x, prev.y + dyEnd * 0.5, cx, endY - dyEnd * 0.3, cx, endY);
  }

  r.track.setAttribute('d', d);
  r.fill.setAttribute('d', d);
  r.grad.setAttribute('y1', startY);
  r.grad.setAttribute('y2', endY);
  r.len = r.fill.getTotalLength();
  r.fill.style.strokeDasharray = `${r.len} ${r.len}`;

  const n = Math.max(120, Math.round(r.len / 6));
  r.samples = [];
  for (let i = 0; i <= n; i++) {
    const l = (r.len * i) / n;
    const pt = r.fill.getPointAtLength(l);
    r.samples.push({ l, x: pt.x, y: pt.y });
  }

  pts.forEach((p, i) => {
    const { link, ring, node } = r.parts[i];
    node.setAttribute('cx', p.x);
    node.setAttribute('cy', p.y);
    ring.setAttribute('cx', p.x);
    ring.setAttribute('cy', p.y);
    link.setAttribute('x1', p.x);
    link.setAttribute('y1', p.y);
    link.setAttribute('x2', p.edge);
    link.setAttribute('y2', p.y);
  });
  r.nodeY = pts.map((p) => p.y);
}

// Point on the path at a given height (the path's y only ever increases).
function atY(r, y) {
  const s = r.samples;
  if (y <= s[0].y) return s[0];
  if (y >= s[s.length - 1].y) return s[s.length - 1];
  let lo = 0;
  let hi = s.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (s[mid].y < y) lo = mid;
    else hi = mid;
  }
  const a = s[lo];
  const b = s[hi];
  const t = (y - a.y) / (b.y - a.y || 1);
  return { l: a.l + (b.l - a.l) * t, x: a.x + (b.x - a.x) * t, y };
}

function frame() {
  raf = 0;
  const goal = markY();
  if (reduceMotion()) cur = goal;
  else {
    const lag = window.innerHeight * 1.5; // never trail far behind a jump
    cur = clamp(cur, goal - lag, goal + lag);
    cur += (goal - cur) * 0.12;
  }

  roads.forEach((r) => {
    if (!r.samples.length) return;
    const local = cur - r.top;
    const p = atY(r, local);
    r.fill.style.strokeDashoffset = r.len - p.l;
    r.orb.setAttribute('cx', p.x);
    r.orb.setAttribute('cy', p.y);
    const inside = local > r.samples[0].y && local < r.samples[r.samples.length - 1].y;
    r.orb.setAttribute('opacity', inside ? 1 : 0);

    r.nodeY.forEach((ny, i) => {
      const part = r.parts[i];
      const on = local >= ny - 2;
      if (on === part.on) return;
      part.on = on;
      r.stops[i].classList.toggle('lit', on);
      part.node.classList.toggle('lit', on);
      part.link.classList.toggle('lit', on);
      part.ring.classList.toggle('lit', on); // ring pulses once on arrival
    });
  });

  if (Math.abs(goal - cur) > 0.5) raf = requestAnimationFrame(frame);
}

const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
const remeasure = () => { roads.forEach(measure); kick(); };

function start() {
  cur = markY(); // start where the reader is, not from the top
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', remeasure);
  narrowQuery.addEventListener('change', remeasure);
  if ('ResizeObserver' in window) resizeObserver = new ResizeObserver(remeasure);
}

function stop() {
  window.removeEventListener('scroll', kick);
  window.removeEventListener('resize', remeasure);
  narrowQuery.removeEventListener('change', remeasure);
  if (resizeObserver) resizeObserver.disconnect();
  resizeObserver = null;
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}

/**
 * Register a road. `els` holds the road element, its stop elements, and the
 * SVG pieces: grad, track, fill, orb, and parts[] of { link, ring, node }.
 * Returns an unregister function.
 */
export function registerRoad(els) {
  if (!roads.size) start();
  const r = { ...els, parts: els.parts.map((p) => ({ ...p, on: false })), top: 0, len: 0, samples: [], nodeY: [] };
  roads.add(r);
  measure(r);
  if (resizeObserver) resizeObserver.observe(r.road);
  kick();

  return () => {
    roads.delete(r);
    if (resizeObserver) resizeObserver.unobserve(r.road);
    r.stops.forEach((s) => s.classList.remove('lit'));
    if (!roads.size) stop();
  };
}
