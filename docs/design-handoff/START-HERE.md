# Start here

Everything Claude Code needs to build the new aianvil.co from design F, and nothing else.

- `HANDOFF.md`: the full build spec (copy rules, tokens, links, console behavior, quality bar, Git workflow)
- `CLAUDE.md`: standing rules for the repo; it ends up at the repo root
- `reference/F-console-loop.dc.html`: the approved design, the source of truth for copy and styling
- `assets/`: the logo mark, the Perfect Placement demo video and its poster frame, and the favicon

## Steps

1. Get the repo on your machine.
   - New clone: `git clone https://github.com/AI-Anvil/aianvil-main-site.git`
   - Existing clone: `git remote set-url origin https://github.com/AI-Anvil/aianvil-main-site.git`, then `git checkout main && git pull`
2. Create the branch: `cd aianvil-main-site && git checkout -b revamp`
3. Copy this folder into the repo as `docs/design-handoff`:
   `cp -R ~/Documents/Claude/Projects/AIAnvil/aianvil-site-handoff docs/design-handoff`
4. Start Claude Code in the repo (`claude`) and paste the prompt below.

## Prompt to paste

```
We're rebuilding aianvil.co on the `revamp` branch.

1. Read docs/design-handoff/HANDOFF.md fully, then docs/design-handoff/reference/F-console-loop.dc.html.
2. Copy docs/design-handoff/CLAUDE.md to the repo root.
3. Before writing code, give me a short plan: the Astro structure, the components, which old files you'll delete, and anything in the handoff that's unclear or conflicts. Wait for my OK.
4. Then build it exactly as specified. The copy is verbatim from the reference file, and the console behaves as described in section 6.
5. Run the build, fix any errors, commit in sensible steps, push `revamp`, and open a PR into `main`. Don't merge.
```

When the PR is open, Netlify posts a Deploy Preview link on it. Review the preview on your phone and laptop. Merging the PR is the launch.
