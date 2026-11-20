import { useEffect, useRef, useState } from 'react';
import { EMAIL, GITHUB, nav } from '../data.js';

// Sticky header. On phones the links move into a menu that opens inside the
// floating header card; it closes on a link tap, Esc, or widening the screen.
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const wide = window.matchMedia('(min-width: 601px)');
    const onWide = (e) => { if (e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className="top">
      <div className="wrap top-inner">
        <a className="mark" href="#">Daniel Ugbomah</a>
        <nav aria-label="Sections">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a className="btn btn-sm" href={`mailto:${EMAIL}`}>Email me</a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          ref={button}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="menu" className="menu" hidden={!open}>
        <ul>
          {nav.map((item) => (
            <li key={item.href}><a href={item.href} onClick={() => setOpen(false)}>{item.label}</a></li>
          ))}
        </ul>
        <p className="menu-actions">
          <a className="btn ghost" href={GITHUB}>GitHub</a>
          <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
        </p>
      </div>
    </header>
  );
}
