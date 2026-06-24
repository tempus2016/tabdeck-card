# Changelog

All notable changes are documented here. Release notes are also generated
automatically on GitHub (see `.github/release.yml`).

## v1.0.0 — 2026-06-24

First stable release. A large feature expansion — every item is an opt-in option, unit-tested,
verified on a real Home Assistant instance, and documented on the
[Wiki](https://github.com/tempus2016/tabdeck-card/wiki).

### Tab bar appearance
- `tab_display` (icon / label / both)
- `accent_indicator` — indicator adopts the selected tab's accent
- New styles: `boxed`, `text`
- `indicator_size` — underline thickness
- `align` — start / center / end / justify
- `sticky` tab bar; `elevation` + `bar_background`
- `scroll_buttons` for overflowing bars

### Per-tab
- `subtitle`, `color`, `badge_color`, `badge_display` (text / dot), `hide_inactive_badge`
- `disabled` (greyed, non-selectable)
- `hold_action` (long-press → HA action)
- multiple `cards` with optional `columns` grid

### Dynamic behaviour
- Visibility `and` / `or` / `not` groups, plus `time` and `user` conditions
- `auto_select` — switch tab when an entity becomes active
- `default_if` — conditional default tab
- `transition` — fade / slide panel animations

### Persistence & performance
- `remember: entity` (cross-device) + `storage_key`
- `unmount_hidden`, `swipe_wrap`, debounced resize

### Editor
- Collapsible tab blocks, expand/collapse-all, auto-expand new tab
- Drag-to-reorder, duplicate tab, duplicate-name warnings
- Custom-card presets in the type chooser

### Theming & docs
- `styles` passthrough (CSS variables), `header` strip
- Full GitHub wiki, README refresh, `examples/demo.yaml`
