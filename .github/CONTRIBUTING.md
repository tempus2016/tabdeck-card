# Contributing to Tabdeck Card

Thanks for your interest in improving Tabdeck Card! This is a small,
focused Lovelace plugin — contributions that fix bugs or add well-scoped
features are very welcome.

## Development setup

Requires Node.js 20+.

```
npm install        # install dependencies
npm test           # run the unit tests (Vitest + jsdom)
npm run typecheck  # TypeScript type checking
npm run build      # produce dist/tabdeck-card.js
npm run dev        # rebuild on change while iterating
```

The source lives in `src/`:

- `src/lib/` — pure, unit-tested logic (config normalization, conditions,
  persistence, card lifecycle).
- `src/components/` — the presentational Lit components (tab bar, tab button).
- `src/editor/` — the GUI config editor.
- `src/tabdeck-card.ts` — the main card element.

Every module has a colocated `*.test.ts`. Please add or update tests for any
behaviour you change.

## Testing on real Home Assistant

Unit tests are the first gate, **not** the only one. Frontend cards interact
with Home Assistant's rendering and lifecycle in ways jsdom can't fully model,
so changes that affect rendering or behaviour should be verified on a live
Home Assistant instance:

1. `npm run build`
2. Copy `dist/tabdeck-card.js` into your HA `config/www/`.
3. Add it as a dashboard resource (`/local/tabdeck-card.js`, JavaScript Module).
4. Hard-refresh the browser and check the console for errors.

`npm run test:ha` automates this check against an instance you already have
(it makes a `tabdeck-compat` dashboard and an `input_boolean.tabdeck_compat`
helper, and removes them with `--cleanup`):

```
npm run build   # then copy dist/tabdeck-card.js to config/www/ as above
npx playwright install chromium
npm run test:ha -- --url http://homeassistant.local:8123 --token <long-lived token> --cleanup
```

The **HA compatibility** workflow runs the same check once a month against
fresh Home Assistant `stable` and `beta` containers and updates the
"works with Home Assistant" badge in the README.

## Visual regression tests

`npm run test:visual` screenshots every example of the demo site (desktop,
phone and light theme) and compares them with the baselines in
`tests/visual/linux/`, which CI uses (fonts differ between systems, so local
runs keep their own baselines in an ignored folder):

```
npx playwright install chromium
npm run build:demo
npm run test:visual              # compare
npm run test:visual -- --update  # write baselines for this machine
```

Changed shots, with a diff image highlighting the changes, are written to
`tests/visual/output/`. When a change to the look is intended, run the
**Visual regression** workflow by hand with *update baselines* ticked and
commit the `visual-baselines-linux` artifact into `tests/visual/linux/`.

## Pull requests

- Keep PRs focused — one logical change per PR.
- Match the existing code style and patterns.
- Make sure `npm run typecheck`, `npm test`, and `npm run build` all pass.
  If the look changes on purpose, update the visual baselines (see above).
- Do **not** add AI/Claude co-author attribution to commits or files.

## Reporting bugs and requesting features

Use the issue templates under **New issue**. For security issues, see
[SECURITY.md](./SECURITY.md) — please report those privately.
