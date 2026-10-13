# aianvil.co

The AI Anvil site: Wassim Askoul's studio for working inside products that already exist.

## Stack

- [Astro](https://astro.build), static output to `dist/`, one page (`src/pages/index.astro`)
- Self-hosted fonts via Fontsource (Schibsted Grotesk, plus Noto Kufi Arabic for the one Arabic word in the footer)
- Netlify for hosting and deploys

## Develop

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Deploys

- Every pull request into `main` gets a Netlify Deploy Preview, linked on the PR.
- Merging into `main` deploys to production at aianvil.co.
- Build settings live in `netlify.toml` (they override the Netlify dashboard). Don't change dashboard, DNS or domain settings.

## Editing

- **Copy:** each section is a component in `src/components/` (`Header`, `Hero`, `Console`, `WhereIveBuilt`, `Projects`, `WorkWithMe`, `Writing`, `Footer`). Copy is verbatim from the design source; change it there first if it changes.
- **Console scenarios:** the seeds (customer quote, problem proof line, the two options) are in `src/data/seeds.ts`. The step-by-step lines and timings are in the script inside `src/components/Console.astro`.
- **Links:** booking, Substack, GitHub, LinkedIn and Specdr URLs are in `src/data/links.ts`.
- **Design tokens:** CSS variables at the top of `src/styles/global.css`.

## Social image

`public/og.png` (1200×630) is generated from the design tokens, the mark and the tagline. After changing any of them:

```sh
npm run og
```

The script is `scripts/generate-og.mjs` (Satori + resvg).

## Design source

The approved design (F, "Console in the Loop system"), the full build spec and the source assets are in [`docs/design-handoff/`](docs/design-handoff/). Start with `HANDOFF.md`; `reference/F-console-loop.dc.html` is the source of truth for copy and styling.
