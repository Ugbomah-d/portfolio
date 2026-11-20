# Daniel Ugbomah, portfolio

My personal site: backend and machine learning work, my time at Quocreo on Wexxaro and Prospeaker, projects, experience and certificates.

Live at **https://ugbomah-d.github.io/html-portfolio/**

## Stack

- [Vite](https://vite.dev) + React 18, plain CSS
- No UI libraries. The winding "road" path through Quocreo, Projects and Experience is an SVG drawn and animated by `src/lib/roadEngine.js`. Entrance animations live in `src/lib/reveal.js`.
- Deployed to GitHub Pages by GitHub Actions on every push to `main`

## Run it locally

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/data.js` | All the wording: hero, Quocreo, projects, skills, experience, certificates |
| `src/components/` | One component per section, plus `Road.jsx` for the stop layout |
| `src/lib/roadEngine.js` | Path geometry, the travelling light and the checkpoint highlights |
| `src/lib/reveal.js` | Scroll-in animations |
| `src/styles.css` | All styles, including the responsive and reduced-motion rules |
| `src/assets/` | Project screenshots and certificate images, fingerprinted at build |

To change any text, edit `src/data.js`.

Motion respects the reduced-motion setting: with it on, nothing animates and the checkpoints simply light as you scroll.
