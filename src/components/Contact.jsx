import { EMAIL, GITHUB, contact } from '../data.js';

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="wrap contact-inner">
        <div>
          <h2 id="contact-h">Get in Touch</h2>
          <p>{contact.text}</p>
        </div>
        <ul className="contact-links">
          <li><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><span>GitHub</span><a href={GITHUB}>{GITHUB.replace('https://', '')}</a></li>
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="wrap">© {new Date().getFullYear()} Daniel Timinepre Ugbomah</p>
    </footer>
  );
}
