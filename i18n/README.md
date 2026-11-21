# Translations (Weblate)

The card's texts live in `src/translations/card/<lang>.ts` (shown on the dashboard) and
`src/translations/editor/<lang>.ts` (the visual editor). Weblate can't edit TypeScript, so
this folder holds the same texts as flat JSON (`{ "key": "text" }`), one file per language:

| Folder | Weblate component | What it is |
|---|---|---|
| `i18n/card/` | `tabdeck-card/card` | Texts on the dashboard: tab bar, menus, banners. Keep them short. |
| `i18n/editor/` | `tabdeck-card/editor` | The visual card editor. |

`npm test` fails when the JSON and the TypeScript files differ.

- After adding or changing strings in the `.ts` files: `npm run i18n:export`.
- After Weblate's pull request is merged: `npm run i18n:import`, check the diff, commit.
- `npm run i18n:check` reports which files are out of date.

## Weblate project setup (one-time, by the maintainer)

Create a project `tabdeck-card` on [Hosted Weblate](https://hosted.weblate.org) (free for
open-source projects), then one component per row in the table above with:

| Setting | Value |
|---|---|
| Source code repository | `https://github.com/tempus2016/tabdeck-card.git` |
| Repository branch | `main` |
| Version control system | GitHub pull request (Weblate pushes a branch and opens a PR; nothing goes to `main` directly) |
| File format | JSON file |
| File mask | `i18n/card/*.json` (editor: `i18n/editor/*.json`) |
| Monolingual base language file | `i18n/card/en.json` (editor: `i18n/editor/en.json`) |
| Template for new translations | the same file as the base |
| Source language | English |
| Translation flags | `placeholders:r"\{[a-z_]+\}"` |
| Enable reviews | on (project settings), so a native speaker can mark a text "Approved" |

Add-on **Customize JSON output**: indent 2, don't sort keys, so Weblate's files match
`npm run i18n:export` byte for byte. Install Weblate's GitHub app or webhook on the repo so it sees
new strings.

## Texts with special parts

- `{n}`, `{name}`, `{count}` … are filled in by the card. Keep every one; their order can change.
- Plurals are written in one text: `one:{n} tab|other:{n} tabs`. Keep the labels; languages with
  more forms can add `few:` / `many:` (names as in [Intl.PluralRules](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)),
  e.g. Polish `one:{n} karta|few:{n} karty|many:{n} kart|other:{n} karty`.
- A new language from Weblate needs code too (registering in `src/lib/i18n.ts` and
  `src/translations/editor/index.ts`); `npm run i18n:import` says so and skips it until that's added.
