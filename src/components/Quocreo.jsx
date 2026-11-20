import { quocreo } from '../data.js';
import Road from './Road.jsx';

const { wexxaro } = quocreo;

export default function Quocreo() {
  return (
    <section id="quocreo" className="quocreo" aria-labelledby="quocreo-h">
      <div className="co-head">
        <div>
          <h2 id="quocreo-h">Quocreo</h2>
          <p className="co-role">{quocreo.role}</p>
        </div>
        <p className="co-lede">{quocreo.lede}</p>
      </div>
      <dl className="co-facts">
        {quocreo.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
      </dl>

      <article className="feature">
        <div className="feature-head">
          <h3>Wexxaro</h3>
          <div>
            <p className="lede">{wexxaro.lede}</p>
            <p className="role">{wexxaro.role}</p>
          </div>
        </div>
        <figure className="shot shot-wide">
          <img src={wexxaro.shot.src} alt={wexxaro.shot.alt} loading="lazy" width="1280" height="800" />
          <figcaption>{wexxaro.shot.caption}</figcaption>
        </figure>
        <ul className="suite" aria-label="What I built on Wexxaro">
          {wexxaro.suite.map((s) => <li key={s.name}><b>{s.name}</b>{s.text}</li>)}
        </ul>
        <p className="stack">{wexxaro.stack}</p>
        <div className="live">
          <p className="live-label">Try the live apps</p>
          <ul>
            {wexxaro.live.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
      </article>

      <Road
        items={quocreo.stops}
        getKey={(s) => s.title}
        renderStop={(s) => (
          <>
            <article className="stop-card">
              <h3>{s.title}</h3>
              <p>{s.intro}</p>
              <ul className="ticks">
                {s.ticks.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
            <div className="stop-meta">
              <p className="when">{s.when}</p>
              <p className="what">{s.what}</p>
            </div>
          </>
        )}
      />
    </section>
  );
}
