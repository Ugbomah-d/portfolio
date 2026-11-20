import { useEffect, useId, useRef } from 'react';
import { registerRoad } from '../lib/roadEngine.js';

// A road of stops, alternating either side of a winding path. The path's
// geometry and the travelling light are handled by the road engine.
export default function Road({ items, renderStop, compact = false, getKey = (_, i) => i }) {
  const gradId = 'road-grad-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const road = useRef(null);
  const grad = useRef(null);
  const track = useRef(null);
  const fill = useRef(null);
  const orb = useRef(null);
  const stops = useRef([]);
  const links = useRef([]);
  const rings = useRef([]);
  const nodes = useRef([]);

  useEffect(() => {
    const count = items.length;
    return registerRoad({
      road: road.current,
      grad: grad.current,
      track: track.current,
      fill: fill.current,
      orb: orb.current,
      stops: stops.current.slice(0, count),
      parts: items.map((_, i) => ({ link: links.current[i], ring: rings.current[i], node: nodes.current[i] })),
    });
  }, [items]);

  return (
    <div className={compact ? 'road road-compact' : 'road'} ref={road}>
      <svg className="road-svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradId} ref={grad} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#157A48" />
            <stop offset="1" stopColor="#E9A817" />
          </linearGradient>
        </defs>
        <path className="road-track" ref={track} />
        <path className="road-fill" ref={fill} stroke={`url(#${gradId})`} />
        {items.map((item, i) => (
          <g key={getKey(item, i)}>
            <line className="road-link" ref={(el) => { links.current[i] = el; }} />
            <circle className="road-ring" r="6" ref={(el) => { rings.current[i] = el; }} />
            <circle className="road-node" r="6" ref={(el) => { nodes.current[i] = el; }} />
          </g>
        ))}
        <circle className="road-orb" r="6" opacity="0" ref={orb} />
      </svg>
      <ol className="stops">
        {items.map((item, i) => (
          <li
            key={getKey(item, i)}
            className={item.now ? 'stop stop-now' : 'stop'}
            ref={(el) => { stops.current[i] = el; }}
          >
            {renderStop(item, i)}
          </li>
        ))}
      </ol>
    </div>
  );
}
