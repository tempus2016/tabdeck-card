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
npm run build      # produce dist/tabdeck-card.js, dist/tabdeck-card-editor-<hash>.js and the language chunks
npm run dev        # rebuild on change while iterating
npm run size       # after a build: gzip sizes against the budgets (CI runs it too)
```

The build makes two files: the card (`vite.config.ts`) and, first, the visual
editor as its own self-contained file (`vite.editor.config.ts`), which the card
loads only when the editor is opened. Keep the editor self-contained (no
imports from the card file), and register any custom element both use with
`defineOnce` (`src/lib/define.ts`).

The source lives in `src/`:

- `src/lib/` — pure, unit-tested logic (config normalization, conditions,
  persistence, card lifecycle).
- `src/components/` — the presentational Lit components (tab bar, tab button).
- `src/editor/` — the GUI config editor.
- `src/tabdeck-card.ts` — the main card element.

Every module has a colocated `*.test.ts`. Please add or update tests for any
behaviour you change.

## Size budget

Everyone who uses the card downloads it on every dashboard load, so CI fails
when a built file grows past its gzip budget (`src/lib/size-budget.ts`: the
card, the editor, and each lazy-loaded language chunk). `npm run size` prints
the same table locally after `npm run build`. If a feature needs a lot of code
that only the editor uses, put it in the editor chunk. Raise a budget only on
purpose, in the same pull request, and say why.

## Testing on real Home Assistant

Unit tests are the first gate, **not** the only one. Frontend cards interact
with Home Assistant's rendering and lifecycle in ways jsdom can't fully model,
so changes that affect rendering or behaviour should be verified on a live
Home Assistant instance:

1. `npm run build`
2. Copy every `dist/*.js` (card, editor and language chunks) into your HA `config/www/`.
3. Add it as a dashboard resource (`/local/tabdeck-card.js`, JavaScript Module).
4. Hard-refresh the browser and check the console for errors.

`npm run test:ha` automates this check against an instance you already have
(it makes a `tabdeck-compat` dashboard and an `input_boolean.tabdeck_compat`
helper, and removes them with `--cleanup`):

```
npm run build   # then copy dist/*.js to config/www/ as above
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

## Translations

Tabdeck speaks English, German, Spanish, French, Italian, Dutch, Polish and
Portuguese. Most of the non-English texts were machine-translated, so native
speakers checking them are very welcome.

- **Easiest:** use the Tabdeck project on [Hosted Weblate](https://hosted.weblate.org/projects/tabdeck-card/).
  Suggest or fix a text in the browser; Weblate opens a pull request.
- **By hand:** edit `src/translations/card/<lang>.ts` or
  `src/translations/editor/<lang>.ts`, then run `npm run i18n:export` so the
  JSON copies in `i18n/` that Weblate uses match, and open a pull request.

Keep every `{placeholder}` and the `one:` / `other:` plural labels (see
[`i18n/README.md`](../i18n/README.md)). Card texts appear in the tab bar and
menus, so keep them short. A new language has to be registered in
`src/lib/i18n.ts` (card) and `src/translations/editor/index.ts` (editor): open an
issue first and we'll add it.

## Pull requests

- Keep PRs focused — one logical change per PR.
- Match the existing code style and patterns.
- Make sure `npm run typecheck`, `npm test`, and `npm run build` all pass.
  If the look changes on purpose, update the visual baselines (see above).
- Do **not** add AI/Claude co-author attribution to commits or files.

## Reporting bugs and requesting features

Use the issue templates under **New issue**. For security issues, see
[SECURITY.md](./SECURITY.md) — please report those privately.
