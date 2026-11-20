import { experience } from '../data.js';
import Road from './Road.jsx';

export default function Experience() {
  return (
    <section id="path" className="path" aria-labelledby="path-h">
      <h2 id="path-h">Experience</h2>
      <Road
        compact
        items={experience}
        getKey={(e) => e.title}
        renderStop={(e) => (
          <>
            <div className="stop-card">
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
            <time className="stop-meta when">{e.when}</time>
          </>
        )}
      />
    </section>
  );
}
