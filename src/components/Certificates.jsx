import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data.js';

// Certificate grid with a native <dialog> viewer for the full-size image.
export default function Certificates() {
  const [open, setOpen] = useState(null); // index of the open certificate
  const dialog = useRef(null);
  const openers = useRef([]);
  const lastOpened = useRef(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d || typeof d.showModal !== 'function') return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const onClose = () => {
    setOpen(null);
    // Return focus to the certificate that opened the viewer. Deferred a frame
    // so the browser's own focus restoration doesn't override it.
    const i = lastOpened.current;
    if (i !== null) requestAnimationFrame(() => openers.current[i]?.focus());
  };

  const cert = open !== null ? certificates[open] : null;

  return (
    <section id="certs" className="certs" aria-labelledby="certs-h">
      <h2 id="certs-h">Certificates</h2>
      <p className="note">Click a certificate to view it full size.</p>
      <ul className="cert-grid">
        {certificates.map((c, i) => (
          <li key={c.title}>
            <button
              type="button"
              ref={(el) => { openers.current[i] = el; }}
              onClick={() => { lastOpened.current = i; setOpen(i); }}
            >
              <img src={c.thumb} alt="" loading="lazy" width={c.width} height={c.height} />
              <span><b>{c.title}</b>{c.issuer}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="also">Also: Kaggle Housing Prices competition, ranked 4,119.</p>

      <dialog
        id="viewer"
        aria-labelledby="viewer-title"
        ref={dialog}
        onClose={onClose}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        <div className="viewer-bar">
          <p id="viewer-title">{cert?.viewerTitle}</p>
          <button type="button" className="close" onClick={() => dialog.current?.close()}>Close</button>
        </div>
        {cert && <img id="viewer-img" src={cert.full} alt={`Certificate: ${cert.viewerTitle}`} />}
      </dialog>
    </section>
  );
}
