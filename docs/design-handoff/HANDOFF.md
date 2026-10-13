# aianvil.co rebuild: handoff for Claude Code

Build the new aianvil.co as a single-page Astro site that reproduces design F ("Console in the Loop system") exactly: same copy, same look, same console interaction. This folder is the only context you need. Ignore any other design directions you may hear about; F is the one.

## 1. Source of truth

`reference/F-console-loop.dc.html` is the approved design. Treat it like this:

- **Copy is verbatim.** Every heading, paragraph, button label, alt text and console line comes from this file, word for word. Don't rewrite, shorten or "improve" copy. If something reads oddly, leave it and flag it in the PR description.
- **Inline `style="…"` attributes are the exact design tokens** (colors, sizes, weights, spacing, radii). Lift them into CSS variables and component styles; keep the values.
- **Template syntax is from a design tool, not something to ship.** `{{…}}` holes, `<sc-if>`, `<sc-for>` and `<x-dc>`/`<helmet>` wrappers are design-tool markup. The `<script type="text/x-dc">` block holds the console's state machine: port its logic (section 6), don't copy the class.
- `/_blob/…` URLs in the file are the design tool's asset store. Use the files in `assets/` instead (section 4).

## 2. The repo and how it deploys

- Repo: `github.com/AI-Anvil/aianvil-main-site` (renamed from `anvil-forge-reborn-website`).
- Netlify project `aianvil`, production branch `main`. Every pull request into `main` gets a Deploy Preview automatically.
- `aianvil.co` (primary) and `www.aianvil.co` are on Netlify DNS with auto-renewing HTTPS. Never touch domains, DNS or dashboard settings.
- Today the dashboard runs `npm run build` but publishes `/` (the raw repo). Add a `netlify.toml` so the new build is what gets published; file settings override the dashboard:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## 3. What to build

- **Astro**, static output to `dist/`. One page: `src/pages/index.astro`.
- Components, in page order: `Header`, `Hero`, `Console`, `WhereIveBuilt`, `Projects` (Perfect Placement feature + Specdr / RIP'D / Pandora rows), `WorkWithMe`, `Writing`, `Footer`.
- **Fonts, self-hosted** with `@fontsource/schibsted-grotesk` (400, 500, 700, 800) and `@fontsource/noto-kufi-arabic` (500, used only for the Arabic word in the footer). No Google Fonts link.
- **Navigation is three links plus the button:** Projects (`#work`), Work with me (`#services`), Writing (Substack), then "Let's talk". There are no Open source or About nav links.
- **Anchors that must exist:** `#top`, `#work`, `#open-source`, `#services`, `#about`. They stay as section ids even without nav links. `#services` matters beyond the page: Wassim's LinkedIn "Book FREE AI Readiness Chat" button points to `aianvil.co/#services`.
- **Remove the old site:** `index.html`, `main.js`, `vite.config.js`, `css/`, `js/`, `public/images/image.txt`, the `lovable-tagger` dependency and the Lovable `gptengineer.js` script, and any images not used below. Start `package.json` fresh for Astro.

### Design tokens (from F)

| Token | Value | Used for |
|---|---|---|
| ground | `#13102A` | page background |
| surface | `#1B1738` | console panel, Writing band |
| surface-2 | `#221D45` | console's proof column |
| rule | `#2F2A52` | dividers, idle progress bars |
| ink | `#F3F0FF` | primary text |
| ink-2 | `#D9D4F2` | body copy |
| muted | `#B4ADD6` | secondary text |
| cold (agent, problem proof) | `#7AA2FF` | agent dots, Pandora status |
| lilac (solution proof) | `#B8AAFF` | Specdr status, borders |
| amber (you decide, impact proof) | `#FFB347` | human dots, decision panels, focus ring |
| molten (primary action) | `#FF6A3D` | "Let's talk", "Book an AI Readiness Chat", "Run this on your product" |
| on-accent text | `#1A0E08` | text on amber and molten buttons |

Type: Schibsted Grotesk throughout, body 19px / 1.55. Headings 800 weight with negative tracking as in F. Buttons: 12px radius, 44px minimum height.

## 4. Assets (in `assets/`)

| File | Where it goes | Notes |
|---|---|---|
| `ai-anvil-mark.png` | header (34px tall) and footer (28px tall), before "AI Anvil" | Transparent background. `alt=""` because the wordmark sits next to it |
| `perfect-placement-demo.webm` and `.mp4` | Perfect Placement feature | Use `<video autoplay muted loop playsinline preload="metadata" poster="…">` with both sources. This replaces the 4 MB GIF in the design |
| `perfect-placement-demo-poster.png` | video `poster` | Also the reduced-motion fallback: with `prefers-reduced-motion: reduce`, don't autoplay |
| `favicon.png` | `public/favicon.png` | The existing AI Anvil favicon |

Video accessible name: "A 20-second tour of Perfect Placement on demo data: Now, Needs you, River, a role, People, You and Settings" (use `aria-label` on the video).

## 5. Links

| Element | Target |
|---|---|
| Every booking button ("Let's talk", "Book an AI Readiness Chat", "Run this on your product") | `https://calendly.com/aianvil/ai-anvil-consultation`, opened in an in-page pop-up (section 5a) |
| Nav: Projects / Work with me | `#work` / `#services` |
| Nav: Writing, footer Substack icon | `https://aianvil.substack.com` |
| "Subscribe on Substack" button | `https://aianvil.substack.com/subscribe` |
| "Try it on GitHub" | `https://github.com/askoulwassim/perfect-placement` |
| "Read more at specdr.ai", "That's Specdr." | `https://specdr.ai` |
| Footer LinkedIn icon | `https://www.linkedin.com/in/askoulwassim/` |
| Footer GitHub icon | `https://github.com/askoulwassim` |
| RIP'D "Read the case study" | **Not a link yet.** Render the same words as plain muted text (`#B4ADD6`), not focusable, with a `TODO: link RIP'D case study` comment |

External links open in the same tab (as in the design). No tracking parameters.

### 5a. Booking opens in a pop-up, not a new page

All three booking buttons open Calendly in a pop-up over the page, using Calendly's own pop-up widget.

- Load `https://assets.calendly.com/assets/external/widget.css` and `widget.js` (async) on the page.
- Keep each button an `<a href="https://calendly.com/aianvil/ai-anvil-consultation">`. On click, call `event.preventDefault()` and `Calendly.initPopupWidget({ url: 'https://calendly.com/aianvil/ai-anvil-consultation' })`. If the script hasn't loaded or JavaScript is off, the plain link still works.
- Optionally pass Calendly's theme parameters so the pop-up matches: `background_color=1b1738`, `text_color=f3f0ff`, `primary_color=ff6a3d` (Calendly applies these on plans that support it; harmless otherwise).
- The design's dialog (titled "Book an AI Readiness Chat", with a close button and a dashed placeholder) only stands in for Calendly's pop-up. Don't build that placeholder; Calendly's widget provides the dialog, close button and focus handling.

### 5b. Footer social links are brand icons

The footer shows icons instead of the words LinkedIn, GitHub and Substack. Each one is a 48×48px link with a 12px radius and a 1.5px `#2F2A52` border, holding a 22px icon in `currentColor` (ink, amber on hover and focus). Each link has `aria-label` and `title` set to the network's name.

The design file uses neutral stand-in glyphs (a briefcase, code brackets, an envelope). Replace them with the official brand icons: GitHub and Substack from the `simple-icons` package; LinkedIn from LinkedIn's own brand asset downloads, since Simple Icons no longer includes it. Keep them monochrome so they sit quietly in the palette.

## 6. The console (the one interactive piece)

Render the initial state as HTML at build time, then enhance with a small client script (vanilla TypeScript in the component's `<script>`). No framework island is needed.

**Legend row:** a blue dot "Agent carries", an amber square "You decide", and "Working in: your existing product".

**Progress strip (top of console), three segments:** Problem proof (`#7AA2FF`), Solution proof (`#B8AAFF`), Impact proof (`#FFB347`). Idle segments have a `#2F2A52` bar and `#8E87B3` label. Problem lights at step 2; Solution lights at step 5; after "Send it to them" the Impact bar fills half (`linear-gradient(90deg, #FFB347 50%, #2F2A52 50%)`) and its label becomes "Impact proof, once it ships". The strip is decorative (`aria-hidden`); the log carries the meaning.

**State:** `seed` (none | support ticket | lost-deal note | call notes), `step` (0–5), `choice`, `outcome` (none | sent | held).

| Step | Trigger | What appears |
|---|---|---|
| 0 | page load | "What did your customers just tell you?" and three amber seed buttons: "A support ticket", "A lost-deal note", "Customer call notes" |
| 1 | seed clicked | Seed buttons disappear. Log: "Customers: " + the seed's quote (amber), then "Agent: reading it against your product, its screens, data and design system…" (blue) |
| 2 | 1200 ms later | The seed's "Problem proof: …" line (blue), then the decision panel "Your call: which job matters most?" with the seed's two options |
| 3 | option clicked | "You chose: {option}." (amber), then "Agent: brief drafted against your existing app. One job, one screen. Success means they stop asking." |
| 4 | 1000 ms after the click | "Agent: building the proof inside your app, in your UI, at a shareable link…" |
| 5 | 2400 ms after the click | "Agent: solution proof is live in your app. Waiting on you." and the decision panel "Your call: send the proof to the customers who raised it?" with "Send it to them" / "Not yet" |
| end | Send or Not yet | Sent: "You sent it to the customers who raised it. Their feedback hardens the solution proof, engineering gets evidence instead of a ticket, and the impact proof is read from your metric once it ships." Held: "You held it. The agents keep iterating until you say go." Then "Run this on your product" (molten, opens the booking pop-up) and "Start over" |

Seed quotes, problem-proof lines and options are in the `SEEDS` object in the reference file. Copy them exactly.

**The proof column, right side:** a light card titled "Your app" with a status pill. Status by step: Waiting, Reading, Your call, Drafting, Building, Your call; then Sent or Held, with colors from `statusMap` in the reference. Inside the card, a dashed box: before step 4 its label is "Coming soon to this screen" with a muted border; from step 4 it's "New, in your existing screen" with a `#FF6A3D` border and `#FFF1E8` fill. The box title is the chosen option, or "Reading your product" after a seed, or "Your next improvement" at rest. The note under it switches at step 4 from "Pick what your customers said and watch the change land here." to "A working proof in the product your customers already use." Under the card: "An illustration of how I work. The scenarios are made up."

**Behavior rules:**

- Lines are colored by who acts: amber with a 3px-radius square for customers and you, blue with a round dot for the agent.
- Put `aria-live="polite"` on the log so screen readers hear new lines.
- "Start over" clears pending timers and resets every field.
- All controls are real `<button>` elements, at least 48px tall, with the amber focus ring.
- With JavaScript off, show step 0 and keep the booking link visible below it.

## 7. Head, meta, SEO

- `<title>`: "AI Anvil, by Wassim Askoul"
- Meta description: "I work inside products that already exist: your code, your customers, your team. Humans decide. Agents carry."
- Open Graph and Twitter tags with `og:url` `https://aianvil.co/` and an `og:image` at `public/og.png`, 1200×630. Generate it from the tokens: ground `#13102A`, the mark, "AI Anvil" and "Humans decide. Agents carry." in Schibsted Grotesk. Keep the generating script in the repo.
- `@astrojs/sitemap` with `site: 'https://aianvil.co'`, plus a `robots.txt` that points to the sitemap.
- `<html lang="en">`. The footer words carry their own `lang`: `ar` (with `dir="rtl"`), `es`, `no`.

## 8. Quality bar

- Matches F at 1440px and works at 375px. F's layout already wraps with flex and grid; keep that behavior, with no horizontal scrolling.
- Lighthouse 90+ for performance and accessibility on the Deploy Preview.
- Visible keyboard focus everywhere (2px `#FFB347` outline, 3px offset).
- Respect `prefers-reduced-motion`; the only motion is the demo video and the console's timed steps, which are fine.
- No console errors, and every link in section 5 resolves.

## 9. README

Replace the README with: what the site is (one line); the stack (Astro, self-hosted fonts, Netlify); `npm install`, `npm run dev`, `npm run build`, `npm run preview`; how deploys work (PR = Deploy Preview, merge to `main` = production, settings in `netlify.toml`); where to edit copy (component files) and the console scenarios (the seeds data); how to regenerate `og.png`; and a short "Design source" note pointing to `docs/design-handoff/`.

## 10. Git workflow

- Work on the `revamp` branch. Never commit to or push `main`; merging the PR is the launch, and Wassim does it.
- Commit in sensible steps, push `revamp`, and open a PR into `main` titled "New aianvil.co (design F)". The PR description lists anything flagged, the Deploy Preview link once Netlify posts it, and a checklist from section 8.
