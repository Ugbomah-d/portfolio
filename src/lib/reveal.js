import { narrowQuery, reduceMotion } from './media.js';

// Entrance animations: content slides, rises or pops in as it enters the
// viewport. Road stops slide in from their own side. With reduced motion or
// no IntersectionObserver, nothing is hidden. Returns a cleanup function.
export function initReveal(root = document) {
  if (!('IntersectionObserver' in window) || reduceMotion()) return () => {};

  const targets = [];
  const add = (el, kind, delay) => {
    el.classList.add('reveal');
    if (kind) el.classList.add(kind);
    if (delay) el.style.setProperty('--d', delay.toFixed(2) + 's');
    targets.push(el);
  };
  const each = (sel, fn) => root.querySelectorAll(sel).forEach(fn);

  each('main > section > h2, .co-head, .co-facts, .skills, .contact-inner', (el) => add(el));
  each('.facts-band .facts > div', (el, i) => add(el, null, i * 0.1));
  each('.feature', (el) => add(el, 'pop'));
  each('.suite li', (el, i) => add(el, null, (i % 2) * 0.1 + Math.floor(i / 2) * 0.06));

  const narrow = narrowQuery.matches;
  each('.stop', (stop, i) => {
    const cardLeft = !narrow && i % 2 === 0;
    const card = stop.querySelector('.stop-card');
    const meta = stop.querySelector('.stop-meta');
    // Phones: cards slide in from the side their lane is on. Desktop: cards
    // come from their own side, companions from the opposite side.
    const fromOwnSide = (narrow ? i % 2 === 0 : cardLeft) ? 'from-left' : 'from-right';
    if (card) add(card, fromOwnSide);
    if (meta) add(meta, narrow ? null : cardLeft ? 'from-right' : 'from-left', 0.12);
    stop.querySelectorAll('.ticks li').forEach((li, j) => add(li, null, 0.2 + j * 0.06));
  });

  each('.cert-grid li', (el, i) => add(el, 'pop', i * 0.08));

  document.documentElement.classList.add('js-reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  targets.forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    document.documentElement.classList.remove('js-reveal');
    targets.forEach((el) => {
      el.classList.remove('reveal', 'in', 'pop', 'from-left', 'from-right');
      el.style.removeProperty('--d');
    });
  };
}
