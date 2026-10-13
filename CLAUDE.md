# aianvil.co

The AI Anvil site (AI Anvil, by Wassim Askoul). Single-page Astro site, deployed by Netlify.

## Rules

- Production is `main`, which Netlify serves at aianvil.co. Never commit to or push `main`; work on a branch and open a PR. Merging is Wassim's call.
- Never change Netlify dashboard settings, DNS or domains. Build settings live in `netlify.toml`.
- The approved design and copy live in `docs/design-handoff/` (`HANDOFF.md` and `reference/F-console-loop.dc.html`). Copy is verbatim from there; don't rewrite it unless asked.
- `#services` must keep existing: LinkedIn links to `aianvil.co/#services`.
- Booking buttons open the site's booking dialog, which embeds the Google Calendar appointment schedule (`src/data/links.ts`). The plain link `https://calendar.app.google/rf3asMV12tJGQFzc7` is the fallback.
- Navigation is Projects, Work with me, Writing and the "Let's talk" button. Footer social links are brand icons.

## Voice, for any copy you're asked to draft

Declarative, first person, short lines, builder-focused. No em dashes. No hype adjectives. Say "open source", never a license name. The positioning is brownfield: work inside products that already exist, and prove the problem, the solution and the impact.

## Done means

`npm run build` passes, the Deploy Preview looks right at 375px and 1440px, Lighthouse 90+ for performance and accessibility, and all links resolve.
