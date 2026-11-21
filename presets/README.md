# Tabdeck style presets

Shareable looks for the Tabdeck card. The [preset gallery](https://tempus2016.github.io/tabdeck-card/demo/presets.html)
shows every file in `community/`, and **Import a style** in the card editor takes the JSON.

## Add yours

1. Copy one of the files in `community/` to a new lower-case name, e.g. `community/sunset.json`.
2. Set `name`, `author` (your GitHub name) and a one-sentence `description`.
3. Put the look in `config`. Only these options are allowed: `preset`, `position`, `style`, `tab_display`,
   `align`, `badge_display`, `density`, `transition`, `transition_duration`, `transition_easing`,
   `indicator_size`, `indicator_radius`, `animated`, `liquid_indicator`, `accent_indicator`, `elevation`,
   `bar_background`, `glass` and `styles` (CSS variables starting with `--tabdeck-`). Values can't contain
   `url(`, `;`, `{`, `}`, `<`, `>` or `\`.
4. Run `npm test` (a test checks every preset) and open a pull request.

The format is described in [`preset.schema.json`](preset.schema.json); editors that understand JSON Schema
check the file as you type thanks to its `$schema` line.
