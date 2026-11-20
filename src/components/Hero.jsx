import { EMAIL, GITHUB, facts, hero } from '../data.js';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="name">
      <div className="wrap hero-inner">
        <p className="role">{hero.role}</p>
        <h1 id="name" className="name">{hero.first} <span>{hero.last}</span></h1>
        <p className="intro">{hero.intro}</p>
        <p className="actions">
          <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
          <a className="btn ghost" href={GITHUB} rel="me">GitHub profile</a>
        </p>
      </div>
    </section>
  );
}

export function FactsBand() {
  return (
    <section className="facts-band" aria-label="At a glance">
      <dl className="facts">
        {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
      </dl>
    </section>
  );
}
