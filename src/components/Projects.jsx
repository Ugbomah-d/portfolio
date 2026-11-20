import { projects, skills } from '../data.js';
import Road from './Road.jsx';

export default function Projects() {
  return (
    <section id="work" className="work" aria-labelledby="work-h">
      <h2 id="work-h">Projects</h2>

      <Road
        items={projects}
        getKey={(p) => p.title}
        renderStop={(p) => (
          <>
            <article className="stop-card project">
              <h3>{p.title}</h3>
              <p className="sub">{p.sub}</p>
              {p.body.map((para) => <p key={para}>{para}</p>)}
              <p className="stack">{p.stack}</p>
              {p.links.length > 0 && (
                <p className="links">
                  {p.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
                </p>
              )}
            </article>
            <figure className="stop-meta shot">
              <img src={p.shot.src} alt={p.shot.alt} loading="lazy" width="1280" height="800" />
            </figure>
          </>
        )}
      />

      <div className="skills">
        <h3>What I Work With</h3>
        <dl>
          {skills.map((s) => [<dt key={s.label + '-t'}>{s.label}</dt>, <dd key={s.label + '-d'}>{s.value}</dd>])}
        </dl>
      </div>
    </section>
  );
}
