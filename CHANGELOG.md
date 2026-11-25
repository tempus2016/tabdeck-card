# Changelog

All notable changes are documented here. Each GitHub release uses the matching
section below as its release notes (see `.github/workflows/release.yml`).

## Unreleased

## v1.6.1 — 2026-11-25

This release fixes two bugs. A tab action written as `call-service` with `data:` (the key Home Assistant uses today) ran its service without the data, so a service that needs an entity failed. And with `swipe_peek` on, dragging a slider sideways on a touch screen dragged the tab's panel with it and left it stuck halfway. Four dependencies were updated too. Nothing about how a deck is set up changes.

## Fixed

- **Tab actions written with `data:` pass their data to the service.** An action with `action: call-service` used to pass on only the older `service_data:` key, so with `data:` the service ran without it. A service that needs an `entity_id`, such as `light.turn_on`, failed with an error in the browser console and nothing happened. Both keys now work, and so does `target:`. This covers every action the card runs: `tap_action`, `hold_action`, `double_tap_action`, `badge_action`, `enter_action`, `leave_action` and the wizard's `finish_action`. `perform-action` actions, which Home Assistant's action picker in the editor writes, already worked and are unchanged. ([#215](https://github.com/tempus2016/tabdeck-card/pull/215), [#218](https://github.com/tempus2016/tabdeck-card/pull/218))

  ```yaml
  tabs:
    - name: Cameras
      enter_action:
        action: call-service
        service: script.turn_on
        data:
          entity_id: script.start_stream
      card: { type: markdown, content: "
  ```

- **With `swipe_peek`, dragging a slider no longer slides the tab's panel too.** On a touch screen, dragging something that handles its own sideways drags (a tile card's brightness bar, for example) used to slide the panel along with your finger, show the next tab beside it and leave both stuck halfway when you let go. The panel now stays still while you use the slider. Behind this was a timing bug that affected every touch swipe: whether a swipe counted depended on the order the browser sent its pointer and touch events. The deck now follows one rule on every browser: a drag that starts on something that takes sideways drags itself (a slider, a map) belongs to it, and a drag anywhere else switches tabs. Without `swipe_peek`, that is what already happened in Chrome, so nothing changes there. To have sliders keep the drag with a mouse as well (`swipe_mouse`), turn on `swipe_lock`. See [Gestures](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Gestures). ([#218](https://github.com/tempus2016/tabdeck-card/pull/218))

## Changed

- **Dependencies updated.** custom-card-helpers 2.0.0 → 2.2.1 ([#215](https://github.com/tempus2016/tabdeck-card/pull/215)), and for building and testing only: vite 8.3.7 → 8.3.8 ([#213](https://github.com/tempus2016/tabdeck-card/pull/213)), jsdom 30.1.3 → 31.0.1 ([#216](https://github.com/tempus2016/tabdeck-card/pull/216)), playwright 1.65.0 → 1.65.1 and vitest ([#217](https://github.com/tempus2016/tabdeck-card/pull/217)).

## Upgrading

- **Home Assistant Marketplace (HACS):** update Tabdeck and reload the browser.
- **Manual install:** copy `tabdeck-card.js` and the new `tabdeck-card-editor-<hash>.js` from the release into the same folder, and delete the old `tabdeck-card-editor-<hash>.js`. The language files haven't changed since 1.6.0.

Nothing in this release changes what an existing configuration does.

**Full changelog:** https://github.com/tempus2016/tabdeck-card/compare/v1.6.0...v1.6.1

## v1.6.0 — 2026-11-21

This release adds 87 features, folds the visual editor into sections, and brings the card to twenty languages. Decks can open an overview of every tab, find a card with Ctrl+K, show one tab in a popup, run as a step-by-step wizard, switch together with other decks, and hand the screen to a camera when the doorbell rings, then go back. A tab can show a dashboard view, a web page or Markdown in one line, and a tab's badge can be a progress bar, a small history graph or a countdown. For wall tablets there is a screensaver, quiet hours, keep-awake and a click sound. The editor used to be one list about twelve screens long and now opens at about one screen, with search, undo, a config check and a plain-language summary. Languages load only when used, twelve more were added, and the deck lays out right to left for Arabic. A new companion integration makes each browser's deck a Home Assistant entity. Four changes alter what an existing deck does (see Upgrading): automatic switches respect a PIN, a scrolling bar fades at its edges, `lazy: true` now really defers cards, and `remember: browser` saves the tab by name.

## Fixed

- **`remote_event` listens from the moment the dashboard opens.** Home Assistant hands a card its connection before putting it on the page, sets its config again while laying out the dashboard, and moves cards around. Each time, the deck stopped listening for `tabdeck_select` events until some entity changed state, so on a quiet system an automation's switch was missed. It now listens again straight away. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Automatic tab changes no longer interrupt you.** A switch asked for by `remote_entity`, `remote_event`, `remember: entity` or `auto_select` used to happen even while you were typing in a field or dragging a slider on the deck, taking the field away mid-edit. It now waits until you let go or leave the field, and `auto_rotate` skips its turn. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **`lazy: true` now defers building cards.** It never did: every tab's card was built when the dashboard loaded, with or without it. Now only the open tab's card is built, and each other tab's card is built the first time you open it. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Nothing moves when the device asks for less motion.** Panel transitions, the moving indicator, badge bounces, icon animations, the alert pulse and the screensaver already stopped under **Reduce motion**, but a few things still moved: the colour fade on tabs, the pagination dots, the content arrows fading in, the rail opening, the editor's chevrons and smooth scrolling (the scroll buttons, `scroll_spy` and entity search). Now every animation and transition in the card and editor finishes at once, and scrolling jumps. A test checks that any new animation has a reduced-motion path. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **`auto_tabs` templates that return JSON with `true` / `false` in it work.** Home Assistant hands such output back as text; the card now reads it as a list instead of making no tabs. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A PIN-locked tab stays hidden in every layout.** A tab with a `pin` asked for its code before it opened, but its cards were still on screen wherever the deck shows more than one tab at once: every section of a `scroll_spy` deck and every column of a wide `split` layout. They also stayed on screen after a `pin_timeout` unlock ran out (the open tab, a compared tab, the `pip` window, a popup), when every tab was locked, and when a `tab_ref` shared tab with a PIN arrived on the open tab. Now a locked tab shows a lock, its name and an **Enter PIN** button there instead; the button opens the usual prompt and the right code shows the content in place, and when the unlock runs out the lock comes back straight away. Holding a locked tab with `compare` or `hold_peek`, or opening it as a popup, asks for the code first instead of doing nothing. Export as a dashboard view notes that a PIN doesn't carry over. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))

## Added

- **A pinned bar can hide while you scroll down.** `bar_autohide: true` slides a `sticky` bar, the `dock` or a `scroll_spy` bar out of view while the page scrolls down, and brings it back as soon as it scrolls up. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Separators in the tab bar.** A tab's `separator: line` draws a divider before it, and `separator: space` pushes it and the tabs after it to the far end of the bar. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Double-tap a tab to run an action.** `double_tap_action` takes any HA action, alongside `hold_action` for a long-press. A single tap still opens the tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Hold a tab to preview it.** With `hold_peek: true`, holding a tab shows its content floating over the open tab until you let go, without switching. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A dot shows what changed while you were away.** With `changed_dot: true`, a tab gets a dot when one of its entities changes state while you're on another tab, and opening it clears the dot. Each browser keeps its own record. A tab's `watch` list picks the entities when its card's own aren't the right ones. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs can learn their order.** With `sort_by_usage: true`, each browser puts the tabs it opens most first. The order is set when the page loads, so tabs don't move while you're using them, and an order set with `customize` wins. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs show when their devices are offline.** With `health_dim: true`, a tab fades and shows a ⚠ when at least half of its entities are unavailable. A share such as `0.75` sets a different threshold. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs for updates, repairs and notifications.** `auto_tabs.source` adds `updates` (a tab per update waiting to be installed), `repairs` (a tab per open issue in Settings → Repairs) and `notifications` (a tab per persistent notification, with a Dismiss button). Each adds tabs only while there's something to deal with. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Picture-in-picture.** A tab with `pip: true` keeps its card in a small floating window after you switch away, so a camera keeps playing while you use other tabs. Tap the window to go back, or × to close it. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A screensaver for wall panels.** `idle_dim: 5` dims the dashboard after five minutes without a touch. `mode: black` blanks it and `mode: clock` shows a large clock. A touch wakes it without pressing what's underneath. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Preload tabs in the background.** With `lazy: true`, `preload: idle` builds the tabs either side of the open one while the browser is idle, and `preload: all` builds every tab one at a time, so switching is instant without giving up the faster load. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Export a deck as a dashboard view.** **Export as a dashboard view** in the visual editor turns the deck into a Home Assistant sections view, one section per tab with a heading and the tab's cards, ready to paste into a dashboard's raw configuration. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Breadcrumbs for grouped tabs.** `breadcrumbs: true` shows the open tab at every level of grouped tabs above the content, such as **Downstairs › Kitchen**. Tapping a crumb goes back up a level, and `root` adds a first "Home" crumb. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Autocomplete when writing YAML by hand.** A JSON schema of every option is published with the docs. In VS Code or the Studio Code Server add-on, it suggests option names, shows what each one does and flags typos. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A theme builder on the demo site.** [The theme builder](https://tempus2016.github.io/tabdeck-card/demo/theme.html) styles a sample deck live: preset, style, position, colours, indicator, density and font. It then gives you the YAML to paste into your card. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Automation blueprints for switching tabs.** "Show a tab when something happens" switches a deck when an entity changes, and can go back to another tab after a while. "Show <tab> with Assist" switches it when you say "show cameras". Both work through `remote_event`, and an empty deck or device in a `tabdeck_select` event now means any. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **See every tab at once.** `overview: true` adds a grid button to the bar that shows all the tabs as live thumbnails, and tapping one opens it. A two-finger pinch-in over the content opens it too, and so does **o** with `hotkeys`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Search the dashboard for an entity.** With `entity_search: true`, **Ctrl+K** (or the search button in the bar) opens a search box. Type part of an entity's name and pick it to open the tab that shows it, even inside a grouped tab. Every deck on the dashboard with the option is searched together. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Step through tabs by voice.** A new Assist blueprint switches a deck when you say "next tab", "previous tab", "go back" or "home tab". A `tabdeck_select` event (and `remote_entity`) now also takes `next`, `previous`, `back` (the tab open before) and `default` instead of a tab name. For Assist without automations, `voice/` in the repository has the same commands as custom sentences and an `intent_script`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Step through tabs with a knob or remote.** A new blueprint turns a Zigbee rotary knob or a remote into tab controls: turn right for the next tab, left for the previous one, and buttons for the last tab or the default tab. It works with the action `event` entities of Zigbee2MQTT, ZHA and Matter, and with older Zigbee2MQTT action sensors. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Link decks so they switch together.** Decks with the same `sync_group` on a dashboard switch tabs together: open *Kitchen* on one and every other deck in the group opens its own *Kitchen* tab. A deck on another view of the dashboard starts on the tab the group last used. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Open a tab as a popup from another card.** With `popup: true`, a button anywhere on the dashboard opens one of the deck's tabs in a dialog: give it `tap_action: { action: fire-dom-event, tabdeck_popup: Cameras }`. `popup: hidden` hides the deck itself, so it only supplies popups. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Step-by-step guides.** `wizard: true` replaces the tab bar with the step's title, a "Step 2 of 4" counter and a progress bar, with **Back** and **Next** buttons under the content. The last step's **Finish** runs an optional `finish_action` and goes back to the start, which suits guest guides and setup checklists. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Flip back to the last tab.** `last_tab_button: true` adds a swap button to the end of the bar, labelled with the tab you had open before. Tap it to go back, and again to return, or press **l** with `hotkeys`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Change tabs with the mouse wheel.** With `wheel_switch: true`, scrolling the mouse wheel or a trackpad over the tab bar moves one tab along, down or right for the next tab and up or left for the previous one. A trackpad fling still moves only one tab, and at the last tab (without `swipe_wrap`) the page scrolls as usual. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Swipe only from the edges.** `swipe_edge: true` makes a swipe count only when it starts within 40 px of the left or right side of the deck (or give a width, `swipe_edge: 60`), so dragging a slider or panning a map in the middle never changes tab. It applies to `swipe`, `swipe_peek` and `swipe_mouse`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Sliders and maps keep their swipes.** With `swipe_lock: true`, a swipe or mouse drag that starts on a slider (a tile card's brightness bar, a Mushroom slider, a thermostat dial, any range input) or on a map moves that control and never changes tab. Swipes everywhere else still work. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Drag tabs to reorder them.** With `drag_reorder: true`, drag a tab along the bar to a new place: with a mouse straight away, on a touch screen after holding it for a moment. The new order is saved in that browser only, in the same place as the `customize` panel's order, so the **Arrange tabs** panel shows it and its **Reset** undoes it. Esc cancels a drag. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Compare two tabs side by side.** With `compare: true`, holding a tab shows it next to the open tab instead of switching, with both cards live: watch the cameras while you use the lights. The compared tab stays while you switch the main one; its **×**, **Esc** or opening it ends the comparison. On a narrow card the two stack. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Share a link to a tab.** `share_button: true` adds a button to the bar that copies a direct `#tab=` link to the open tab and shows it. `share_button: qr` shows the link as a QR code as well, so a new wall tablet can open the right tab by scanning it. The code is made in the browser, and a deck with the button opens the tab a shared link names whatever `remember` is set to. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The bar can follow the screen's orientation.** `orientation_layout: true` puts the tab bar along the bottom while a tablet or phone is upright and down the left side when it's turned sideways, switching as the screen turns. Choose other sides with `orientation_layout: { portrait: top, landscape: right }`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A tab can show a view you already have.** `view: /energy-dash/energy` fills a tab with the cards of a view on this dashboard or another one, read when the page loads, so nothing is copied and the tab follows the view when you change it. The view is named by its path, number or title; a missing dashboard or view, or a dashboard Home Assistant generates itself, shows a short message in the tab instead. The visual editor has a field for it on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A web page in a tab with one line.** A tab with `url: http://…` shows that page using Home Assistant's own iframe card, so you no longer need to write the card yourself; `aspect_ratio` sets its shape. The visual editor has fields for both on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A text tab with one line.** `markdown:` fills a tab with Home Assistant's markdown card showing that text, templates included, for notes, instructions or a short status summary. The visual editor has a text box for it on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A message instead of a blank tab.** When every card in a tab is hidden by its visibility conditions, `empty_message` shows "Nothing to show right now" there, with your own line under it (`empty_message: All alerts are clear`) or your own title, text and icon. It waits a moment so it doesn't flash while cards load, and goes as soon as a card shows again. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Grey boxes while a tab loads.** With `loading_placeholder: true`, a tab whose card hasn't drawn yet (a `lazy` tab opened for the first time, a big custom card still loading, a `view:` tab fetching its view) shows three softly pulsing grey boxes until it has. A card that has loaded once never shows them again. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Broken cards explain themselves.** With `friendly_errors: true`, a card that can't load shows a plain-words message such as "custom:weather-radar-card isn't installed" or "There's no card type “tiles”" instead of Home Assistant's "Configuration error" box, and its tab gets a red warning badge. While you edit the dashboard, Home Assistant's own error box stays visible too. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs that refresh themselves.** A tab's `auto_refresh: 5` rebuilds its card every five minutes, for camera streams and web pages that go stale on a wall tablet. The open tab is rebuilt in place (never while someone is using it); a tab that falls due while you're elsewhere is built fresh when you open it. The visual editor has a minutes box on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Zoom, padding and spacing per tab.** A tab's `zoom: 0.8` shrinks its content so more fits on a crowded wall tablet (or `1.2` makes it bigger), `padding` sets the space around its cards and `spacing` the gap between them, in HA's stacks and grid as well as Tabdeck's own layouts. The visual editor has fields for all three. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs remember where you scrolled.** With `scroll_memory: true`, switching back to a tab returns the page to where you left it on that tab, instead of wherever the last tab left it. Content that scrolls inside the card (`content_max_height`) is remembered too. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The whole page can change with the tab.** A tab's `page_background` (a colour, gradient, image or template, like `background`) becomes the dashboard view's background while that tab is open, so a Night tab can turn the page dark blue. Switching to a tab without one, leaving the view or removing the deck puts the view's own background back. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Decks with 100+ tabs stay fast.** `bar_limit: 8` draws only eight tabs in the bar, the page that holds the open tab, and the ⋯ button lists every tab, opening at the current one. With `lazy`, a 140-tab `auto_tabs` deck now builds in about 50 ms instead of nearly 2 seconds, and state updates cost a third of what they did. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Progress bars on tabs.** A tab's `ring_style: bar` shows its `ring` value as a thin bar along the bottom of the tab instead of a ring around the icon, so a washing machine cycle or a 3D print shows on label-only tabs too. `ring_max` and `ring_color` work as before, and the visual editor has a switch beside the ring fields. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A tiny graph on a tab.** A tab's `graph: sensor.lounge_temperature` draws a small line of that entity's last 24 hours next to its label, so a temperature or power trend shows without opening the tab. `{ entity, hours, color }` sets a different period or colour. The history is loaded once and kept up to date from new states, and only for tabs the bar actually shows. The visual editor has an entity picker on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Countdown badges.** A tab's `countdown: timer.pasta` shows the time left on that timer as its badge (`12:34`), ticking every second while it runs and holding still while it's paused; when the timer is idle the tab's normal badge comes back. An entity whose state is a time, such as a washer's finish time, counts down to it. The deck only ticks while a countdown is on screen. The visual editor has a timer picker on each tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Several badges on one tab.** A tab's `badges` list adds more badges after its main one, each with its own `badge` (entity, template, count or text), `icon` and `color`: for example a count of open windows, an alarm icon that appears while the alarm is triggered and a lock icon. Icon badges show while their value is active; text badges follow `hide_inactive_badge`, `badge_format` and dot mode like the main badge. YAML only; the visual editor keeps the list. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Badges can bounce when they change.** With `badge_bounce: true`, a tab's badge jumps briefly whenever its value changes, so a new message or a rising count catches the eye. Values that arrive while the page loads and a ticking countdown don't bounce, and nothing moves when the device asks for reduced motion. Editor switch beside "Hide inactive badges". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Hover a tab for a summary.** A tab's `tooltip` shows a short summary such as "2 lights on · hall off" when the mouse rests on the tab, or when keyboard focus lands on it. It can be a template. It stays out of the way on touch screens and of long-press actions, and screen readers get it as the tab's description. The visual editor has a field for it. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Alerts on tabs that don't fit still show.** With `hidden_alerts: true`, the ⋯ menu button shows a red count of tabs you can't see on the bar that need attention (an `alert` that's on, or an active badge), whether they're scrolled out of view or outside the `bar_limit` page, and the menu shows each tab's badge or a red "!". It turns the ⋯ menu on. Editor switch beside the overflow menu. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **An alert count at the end of the bar.** With `summary_chip: true`, a red chip at the end of the bar says how many tabs are alerting, such as "⚠ 3 alerts", and clicking it opens each alerting tab in turn. It hides when nothing is alerting. Your own text (a template if you like, with `{n}` for the count), icon and colour go in `summary_chip: { text, icon, color }`. Editor switch beside the overflow menu. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A frosted glass bar.** `glass: true` turns the tab bar into frosted glass: a see-through tint, a blur of whatever is behind it, a thin light edge and rounded corners. It works with every `style`, and the menus, tooltips and panels that open from the bar are frosted too. A glass `dock` floats above the page instead of sitting on a solid strip. A number such as `glass: 24` sets the blur in px (default 14), and `bar_background` becomes the tint. Editor switch beside "Raise bar with shadow". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tab text stays readable over a bar background.** `bar_text: auto` turns the tab labels, icons and bar buttons black or white, whichever reads better on the `bar_background`, including a picture (`bar_background: "center / cover url('/local/wood.jpg')"`), which is sampled in the background without delaying the card. When the accent would be hard to read on it, the open tab follows too. `bar_text: light` or `dark` sets it yourself, for a picture from another site that can't be read. Editor drop-down below "Tab bar background colour". A new `--tabdeck-tab-color` variable sets the text colour of tabs that aren't open. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A liquid tab indicator.** With `liquid_indicator: true` the indicator no longer slides: its front edge runs ahead to the new tab while the back edge follows, so it stretches over both and thins a little, like a drop, then settles. It works with every style and on side bars. It stays still when the device asks for reduced motion, or with `animated: false`. Editor switch beside "Animate indicator". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Two more presets.** `preset: material-expressive` is a tall, fully rounded tonal bar with bold labels and a springy indicator, inspired by Material 3 Expressive. `preset: liquid-glass` is a floating frosted capsule with a bright, see-through selected lens that flows between tabs, inspired by liquid-glass phone interfaces; it looks best over a dashboard background picture. Both are original styles built from Tabdeck's own options. Presets now also set `glass` and `liquid_indicator`, and a new `--tabdeck-bar-radius` variable rounds the whole bar. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Seasonal looks.** `seasons` changes the look for a range of dates each year: the accent, the bar background, the bar text and any `styles`. Two built-in examples, `winter` (1 Dec to 6 Jan, a dark green bar with a red accent) and `autumn` (25 to 31 Oct, dark brown and orange), can be used as they are or with your own dates and colours (`theme: winter`, `from: "12-15"`). Your own ranges are `{ from: "MM-DD", to: "MM-DD", accent, bar_background, bar_text, styles }` and may wrap over New Year. YAML only. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs can take their colour from their picture.** With `picture_accent: true`, a tab with a `picture` gets its accent from the picture's main colour, so a garden photo gives a green tab and a sunset an orange one. Each picture is read once in the background; until then, or when a picture from another site can't be read, the tab keeps the theme accent. A tab's own `accent` still wins. Editor switch beside "Colour indicator by tab accent". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **An accessibility preset.** `preset: accessible` gives high contrast and large touch targets: 64 px tall tabs outlined in the text colour, full-strength bold 16 px labels, 28 px icons, a solid yellow open tab with black text, and a thick focus ring for keyboard use. It follows light and dark themes. New variables `--tabdeck-tab-border`, `--tabdeck-icon-size`, `--tabdeck-focus-width` and `--tabdeck-focus-color` let you tune any deck the same way. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Right-to-left languages.** When Home Assistant is set to Arabic, Hebrew or another right-to-left language, the deck now lays out right to left: the first tab is on the right, the arrow keys, swipes, scroll buttons and `content_arrows` turn round (← and a swipe to the right go to the next tab), a `left` or `rail` bar sits on the right, and slide transitions and `swipe_peek` move the other way. The card and its menus use logical CSS throughout. `direction: rtl` or `ltr` forces it. Before, everything stayed left to right. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The deck can learn which tab to open.** With `learned_default: true` each browser counts which tab the person picks at each hour of the day, and when the deck loads it opens the tab picked most around this hour, with a small note saying why (its × hides it for good). It only decides the starting tab, and only when nothing remembered, linked or configured (`default_if`, `default_by_device`, `default_by_time`) does; automatic switches are not counted. `min_uses` (default 3) sets how many picks it takes and `notice: false` hides the note. Editor switch "Open the tab used most at this time of day". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The deck can follow you from room to room.** `follow_room: sensor.my_room` points the deck at a room-presence entity (Bermuda, ESPresense, a template sensor or an `input_select`), and when it reports a new room the deck shows that room's tab: one listed in `map`, else a tab whose `area` matches (by area id or name), else a tab with that name. It only acts on changes, waits while someone is using the card and never opens a PIN-locked tab; `not_home` or a room without a tab leaves the deck where it is. Editor entity picker "Follow the room". ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A doorbell press can take over the deck.** `takeover: { entity: binary_sensor.doorbell, tab: Cameras }` jumps to the tab when the entity turns on (or on every press of an `event` or `button` entity), with a banner showing a message, an icon and "Back to Home in 0:30". When the time is up the deck goes back to the tab that was open; the banner's × goes back at once, and opening another tab ends it there. `duration` (default 30 seconds), `state`, `message` and `icon` change it, and it can be a list. Automations can start one too: a `tabdeck_select` event with `takeover: 20` (needs `remote_event`), and a new blueprint, "Take over the deck when the doorbell rings", fills that in from a form. YAML only. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Quiet hours.** `quiet_hours: "22:00-07:00"` (or `{ from, to, entity }`, quiet while a helper is on) stops the deck doing things by itself at night: `auto_rotate`, `idle_return`, `remote_entity`, `remote_event`, `follow_room`, `takeover` and `auto_select` don't switch tabs, alerting tabs keep their colour but stop pulsing,, badges don't bounce and the click sound (`click_sound`) is silent. Tabs the person taps still open. The card gets a `quiet` attribute meanwhile. YAML only. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs can keep the screen on.** A tab with `keep_awake: true` stops the tablet from going to sleep while it is open, for a camera or a recipe. It lets go when another tab opens or the dashboard is hidden, and takes hold again when you come back. It uses the browser's Screen Wake Lock, which needs the dashboard to be opened over https (or on localhost); over plain http it quietly does nothing. Editor switch in each tab's options. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A click sound for kiosks.** `click_sound: true` plays a soft tick when someone switches tabs, made by the browser so there is no sound file to host; a number from 0 to 1 sets the volume (default 0.3). Automatic switches stay silent, and so does everything in `quiet_hours`. Editor volume slider "Click sound on tab change" (0 is off). ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Click a tab in the preview to edit it.** In the card editor, clicking a tab in the preview (Home Assistant's preview next to the editor, or the editor's own preview strip) opens that tab's settings, scrolls to them and highlights them briefly. Nothing to set up. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Undo and redo in the editor.** Every change in the visual editor can be undone and redone, up to the last 50 steps: with the undo and redo buttons pinned to the top of the editor (they appear after the first change, with a line saying what the last change was), or with Ctrl+Z and Ctrl+Shift+Z (Ctrl+Y) while the editor has focus. Inside a text box, Ctrl+Z still undoes typing in that box. Typing in a field counts as one step, and edits made in the code editor can be undone too. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The editor checks your config.** A *Config check* box at the top of the visual editor lists settings that clash (for example `dock` with `wizard`, or a `default_tab` that matches no tab), settings that do nothing without another one (`swipe_lock` without `swipe`, `badge_color` without a badge, `preload` without `lazy`…), unknown options that look like typos (the visual editor drops them on save), and setups that slow the card down (many tabs without `lazy`, very fast `auto_refresh`, lots of templates). It only appears when there is something to say. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Change several tabs at once.** *Select tabs* above the tab list puts a tick box on every tab. Tick the ones you want, pick an icon, accent colour or text colour, and *Apply to selected* sets it on all of them in one go (one undo step). Empty fields are left alone. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Icon suggestions from the tab name.** When a tab's name says what it is, its settings start with a row of fitting icons: a cutlery icon, stove and fridge for "Kitchen", a sofa for "Wohnzimmer", a shower for "Salle de bain". Click one to use it. The keywords cover rooms and common topics (lights, heating, cameras, energy, media…) in all eight editor languages. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Make tabs from your rooms.** *Make tabs from rooms* in the editor lists your Home Assistant areas with how many entities each has. Tick the rooms you want and *Create tabs* adds one tab per room, with the area's name and icon, its `area` set, and an entities card listing what's in it. Rooms that already have a tab start unticked. Unlike `auto_tabs: { source: areas }`, these are ordinary tabs you can change one by one. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The editor says what your card does, in words.** A *What this card does* box under the editor's preview sums the deck up in plain sentences, in your Home Assistant language: how many tabs and which, which tab it opens on (and when another one wins), what it remembers, which tabs only show sometimes, pulse, show badges, need a PIN or run an action, how you move between tabs, and what switches tabs by itself (rotation, going back when idle, a room sensor, a doorbell takeover, quiet hours). It updates as you edit. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Convert from Mushroom chips and newer Bubble Card setups.** *Convert from another card* now understands a Mushroom chips card used as navigation (each chip that opens a view becomes a tab showing that view, a chip that opens a web address becomes an action tab, conditional chips keep their conditions), Bubble Card pop-ups that stand on their own (Bubble Card 3, in a list or a sections view; the cards after a pop-up become its tab), and takes missing pop-up names and icons from a Bubble Card horizontal buttons stack or chips that open them. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A short note in the editor after each update.** After an update, the visual editor opens with a *New in Tabdeck* note saying what changed, with a link to the full release notes. Dismiss it with × and it stays away until the next release (each browser remembers its own). ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Control decks from the browser console or your own code.** Every deck on the page registers with one `window.tabdeck` object: `tabdeck.list()` shows each deck with its open tab, `tabdeck.get("main").select("Cameras")` switches one (by name, index, slug, or `next` / `previous` / `back` / `default`), and `tabdeck.on("tab-changed", …)` reports every switch. Decks are found by their `event_id` (or `storage_key`). Nothing else is added to `window`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Each browser's deck as a Home Assistant entity.** With the new Tabdeck Companion integration installed, `companion: true` gives the deck a select entity per browser (for example `select.tabdeck_kitchen_tablet_main`): its state is the open tab, and `select.select_option` switches the deck from an automation. `companion_id` names the browser; otherwise the Tabdeck device name, browser_mod's id or a stored random id is used. Without the integration the option does nothing. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Usage stats per tab.** `usage_stats: true` records how long each tab is on screen and reports the minutes every 10 minutes (or every N with a number) and when the deck leaves the screen. With the companion integration a sensor per deck holds the total, with minutes per tab in its `tabs` attribute; without it the card fires a `tabdeck_usage` event. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **See how long each tab takes to draw.** `debug: speed` shows the debug panel plus a chip on each tab with its last draw time, green, amber or red, and the panel now lists every tab's card build and draw times. The editor's Debug panel setting has the new choice. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Reuse a tab from another dashboard.** A tab with `tab_ref: family/weather` (or `family/outside/weather`) takes the Weather tab of a Tabdeck card on the `family` dashboard, with its icon, badge and card; keys written next to it override. The other dashboard is read once per page load, and a missing dashboard or tab, or a reference that leads back to itself, shows a clear message in the tab. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A warning when the connection drops.** `offline_banner: true` shows a red "Connection lost · reconnecting…" bar over the deck's content when the connection to Home Assistant is lost for more than 2 seconds, and hides it once it's back, so a wall panel that stopped updating is easy to spot. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Tabs from TaskMate and the Z2M Device Tracker.** `auto_tabs: { source: taskmate }` makes a tab per TaskMate child, showing TaskMate's child card with today's chores left on the badge; `source: z2m_tracker` makes a tab per kind of Zigbee issue the tracker reports (offline, low battery, weak signal…), listing the devices. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A new dashboard from your rooms in one click.** The room wizard (*Make tabs from rooms*) has a second button, *New dashboard with these rooms*, that creates a new dashboard with one deck and a tab per ticked room, and links to it. It never writes to an existing dashboard: it picks an unused address (`tabdeck-rooms`, `tabdeck-rooms-2`, …) and saves only to the dashboard it just made. Only administrators can create dashboards; other users get a message saying so. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Share a config from the live demo.** The demo's YAML box is now a playground you can share: *Copy a link to this config* puts the YAML into the page address (after the `#`, compressed) and copies it, and opening that link shows the same deck. Nothing is uploaded or stored; the config lives only in the link. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A gallery of ready-made looks, and Import a style.** The demo site has a preset gallery that shows each look on a sample deck, with buttons to copy it for the editor, copy it as YAML or try it in the playground. In the card editor, *Import a style* takes a pasted preset and merges only its look options (bar style, shape, colours, `styles` variables) into your card; tabs and behaviour are never changed. It lists any option or value it can't use and imports nothing then, and refuses values with `url(…)`. Presets are JSON files in `presets/community/`, checked by a schema and a test; four are included (Forest, Neon night, Ocean, Paper). ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Help translate on Weblate.** The texts now also live as plain JSON in `i18n/card/` and `i18n/editor/`, ready for the Weblate translation site, so native speakers can check and fix the machine-translated languages in the browser. `npm run i18n:export` and `npm run i18n:import` copy texts between the JSON and the source files, and the tests check that both match and that every translation keeps its `{placeholders}`. How to help is in the Languages page and CONTRIBUTING. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A size check keeps the card small.** CI now fails when the built card or editor grows past its size budget (gzip: card 87 kB, editor 88 kB, each language chunk 16 kB). `npm run size` shows the same table after a build. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **A gallery of short clips.** The docs have a Gallery page with small animated clips of the card (switching tabs, alerts, swiping, the side rail), each linking to the same example in the live demo. The clips are recorded from the demo by a script (`scripts/clips/record-clips.mjs`), so they can be made again after a change to the look. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Twelve more languages.** The card and the visual editor now speak Arabic, Bengali, Hindi, Indonesian, Japanese, Korean, Russian, Turkish, Ukrainian, Vietnamese, Simplified Chinese and Traditional Chinese (also used for Hong Kong Chinese), picked from your Home Assistant language like the others. They were machine-translated, so corrections from native speakers are welcome on Weblate or as a pull request. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))

## Changed

- **`remember: browser` saves the tab by name.** It used to save the tab's position, so after the order changed (`customize`, `alert_first`, and now `sort_by_usage`) a reload could open a different tab. Positions saved by earlier versions are still read. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Automatic tab switches respect the PIN lock.** A tab with a `pin` used to open without the code whenever something other than the person at the screen asked for it: `remote_entity`, a `tabdeck_select` event (Assist, the blueprints, the step words `next` / `previous` / `back` / `default`), the companion integration's select, a `takeover`, `remember: entity` changed on another device and `auto_select`. Since a PIN is there to keep a tab from whoever is at the screen, these switches now leave the deck where it is unless the code was entered in this browser within `pin_timeout`, and no prompt appears. `next` and `previous` step past locked tabs, a doorbell takeover aimed at a locked tab doesn't start, and `follow_room`, linked decks, `auto_rotate` and `idle_return` already skipped them. With `debug` on, the browser console says which switch was skipped. Breadcrumbs and `selectDefault()` now ask for the code too, like `selectTab()`. The config check warns when a `takeover`, a `follow_room` map or `remote_entity` points at a tab with a PIN. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **The visual editor is folded into sections, with search.** It used to be one list of about 80 settings, roughly 9,500 px tall, with four boxes at the top and the tab list far down. Now the tab list comes first, as compact rows (drag handle, icon, name, tags such as *badge*, *PIN* or *no icon*, duplicate, delete), with **Add tab**, **Make tabs from rooms** and **Select tabs** under it. Every other setting sits in one of nine folding sections (Look, Tab bar, Badges & alerts, Switching tabs, Start & memory, Automations, Wall tablet, Performance, Advanced); each header says what is set and shows a dot when something differs from the default, and the open sections are remembered per browser. A search box finds a setting by its label, hint or YAML key in your language, and finds tabs by name. One status line (tab count, config-check notes, what's new) replaces the four boxes and opens the summary, the config check and the release note; config-check notes link straight to their setting. The editor's own preview strip hides when Home Assistant shows its preview beside the editor. Labels are shorter, with a hint line where one helps, in all eight languages. The saved YAML is unchanged. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **An overflowing tab bar fades at the edge that has more tabs.** When the tabs don't fit and the bar scrolls sideways, its end edge fades at the start, both edges fade in the middle and the start edge fades at the end, so it's clear there is more to scroll to; nothing fades when every tab fits. It follows right-to-left languages, and side bars and the dock never fade. It is on for every deck (a visual hint only, so it's listed under Changed rather than Added: existing decks that overflow look slightly different). Set `bar_fade: false` to turn it off. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))
- **Languages load only when needed.** The card and the editor used to carry every language in one file. Now English is built in and every other language is a small file fetched the first time it's used, so the card downloads less even with twenty languages. If you copy the card by hand rather than through the Marketplace, copy every `tabdeck-card*.js` file from the release, not just `tabdeck-card.js`. ([#208](https://github.com/tempus2016/tabdeck-card/pull/208))

## Upgrading

- **Home Assistant Marketplace (HACS):** update Tabdeck and reload the browser. The Marketplace downloads every file the release needs.
- **Manual install:** copy every `tabdeck-card*.js` file from the release into the same folder, not just `tabdeck-card.js`. Besides the card and the editor (`tabdeck-card-editor-<hash>.js`), each language other than English is now its own file (`tabdeck-card.<lang>-<hash>.js`, `tabdeck-card-editor.<lang>-<hash>.js`), fetched only when it's used. Delete the old `tabdeck-card-editor-<hash>.js` files from earlier releases.
- **Tabdeck Companion** (for `companion` and `usage_stats`) is a separate integration: [tempus2016/tabdeck-companion](https://github.com/tempus2016/tabdeck-companion). Without it both options do nothing.

Four changes alter what an existing configuration does:

- **Automatic switches don't open a PIN-locked tab.** `remote_entity`, `tabdeck_select` events, `auto_select`, `takeover`, the companion select and `remember: entity` syncing from another device used to open a tab with a `pin` without the code. They now leave the deck where it is unless that browser entered the code within `pin_timeout`. To let an automation show a tab again, remove its `pin`, or unlock it on the device first. See [PIN](https://github.com/tempus2016/tabdeck-card/wiki/Feature-PIN).
- **A bar that scrolls fades at its edges.** When tabs don't fit, the edge with more tabs beyond it now fades. To keep the hard edge, set `bar_fade: false`. See [Bar fade](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Bar-Fade).
- **`lazy: true` builds a tab's cards the first time it's opened.** Before, it built every card at load anyway. A card that must run in the background from the start, such as one that plays a sound, belongs on a deck without `lazy`, or add `preload: all`. See [Performance](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Performance).
- **`remember: browser` saves the tab's name.** It used to save the position, so after the order changed a reload could open a different tab. Positions saved by 1.5.0 are still read, so nothing needs doing.

The visual editor's new layout changes nothing in the YAML it writes.

**Full changelog:** https://github.com/tempus2016/tabdeck-card/compare/v1.5.0...v1.6.0

## v1.5.0 — 2026-11-07

This release is about how the tab bar looks. Colour options take Home Assistant's own colour names and the editor has HA's colour picker for them. Text on a solid colour turns black or white so it stays readable, and the editor warns when a tab colour is hard to read. Six new presets match the look of HA's tile card, Mushroom, Bubble Card and others. Tabs can show a person's photo, animate their icon and use their own font. The whole bar can be made compact or roomier, and the companion app can vibrate when you change tab. Colour names such as `red` now follow your theme, so a deck that uses them may change shade (see Upgrading).

## Added

- **Colour options take Home Assistant's colour names, and the editor has HA's colour picker.** `accent`, `color`, `badge_color` and `ring_color` on a tab, and `bar_background` on the card, accept the names HA's own cards use: `red`, `light-blue`, `deep-orange`, `amber`, `blue-grey`, `primary`, `accent` and the rest of HA's list. A name becomes your theme's version of that colour, `red` as `var(--red-color, red)`, so it changes with the theme. Names such as `light-blue` and `deep-orange` used to do nothing, because they aren't CSS colours. Any other CSS colour, `#e91e63`, `rgb(…)` or `var(--my-color)`, works as written. In the visual editor, the accent, tab colour, badge colour and ring colour fields show HA's colour picker while they're empty or hold one of these names. A custom CSS value keeps a text field, so it's never hidden behind the picker. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#168](https://github.com/tempus2016/tabdeck-card/issues/168))

  ```yaml
  type: custom:tabdeck-card
  tab_defaults:
    accent: light-blue         # every tab
  tabs:
    - name: Security
      accent: deep-orange      # this tab only
      badge: "{{ states('sensor.open_doors') }}"
      badge_color: amber
      card: { ... }
  ```

- **Text on a solid colour stays readable.** A `badge_color` badge, a floating action tab, and a `pill` or `boxed` indicator filled in with `--tabdeck-indicator-color` used to keep white or accent-coloured text whatever the fill, so a yellow badge had white text on it. The text now turns black or white, whichever has more contrast with the fill. `segmented` keeps its accent-coloured text, because its indicator is card-coloured. Set `--tabdeck-selected-color` to pick the colour yourself. A tab's own `color` also still wins: under `preset: bubble`, a tab with `color: red` keeps red text on the accent bubble. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#169](https://github.com/tempus2016/tabdeck-card/issues/169))

  ```yaml
  styles:
    --tabdeck-indicator-color: "#ffeb3b"   # the selected tab's text turns black
  ```

- **The editor warns when a tab colour is hard to read.** If a tab's `accent` or `color` has less than 3:1 contrast with the current theme's card background, the tab's editor says so and gives the ratio, for example *Accent colour has low contrast with this theme's card background (1.6:1), so it may be hard to read.* It checks against the theme the editor is open in, so switch theme to check a dark one. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#169](https://github.com/tempus2016/tabdeck-card/issues/169))

- **Six new presets.** `preset` now also takes:
  - `neumorphic`: an inset track with a raised, card-coloured selected tab.
  - `ha-tile`: boxed chips like HA's tile card, 52 px tall.
  - `mushroom`: Mushroom-style pills, 40 px tall.
  - `bubble`: a solid accent bubble on a soft track, like Bubble Card, with the badge inverted on the selected tab.
  - `fluent`: a short rounded underline, as in Windows.
  - `material-you`: a tonal pill in the theme's accent, tabs spread across the bar.

  That makes twelve. Keys you set yourself, and `styles`, still win over a preset. Pick one from **Style preset** at the top of the editor. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#170](https://github.com/tempus2016/tabdeck-card/issues/170))

  ```yaml
  type: custom:tabdeck-card
  preset: bubble
  tabs: [ ... ]
  ```

- **New styling variables.** The presets are built on variables you can set in `styles` too: `--tabdeck-indicator-color` and `--tabdeck-indicator-shadow` for the moving indicator, `--tabdeck-selected-color` for the selected tab's text and icon, `--tabdeck-badge-background` and `--tabdeck-badge-color` (and `--tabdeck-selected-badge-…` for the selected tab), and `--tabdeck-tab-padding`, `--tabdeck-tab-radius`, `--tabdeck-tab-font-weight` and `--tabdeck-tab-font-family` for each tab. The [Theming](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Theming) page lists them all with their defaults. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#170](https://github.com/tempus2016/tabdeck-card/issues/170))

- **A tab can show a picture instead of its icon.** `picture` takes an entity, whose `entity_picture` is used (people, media players, some cameras), or an image path or URL. It may be a template. The picture is shown round where the icon would be, and works with a progress `ring`. If the entity has no picture, the tab shows its `icon` instead. In the editor it's **Picture instead of the icon** on each tab. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#172](https://github.com/tempus2016/tabdeck-card/issues/172))

  ```yaml
  tabs:
    - name: Alex
      picture: person.alex
      icon: mdi:account        # if Alex has no photo
      card: { ... }
    - name: Garden
      picture: /local/garden.jpg
      card: { ... }
  ```

- **Tab icons can move.** `icon_animation` makes a tab's icon `spin`, `pulse`, `bounce`, `shake` or `beat`. Make it a template to animate only while something is happening. Animations stop when the device asks for reduced motion. In the editor it's **Icon animation** on each tab. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#171](https://github.com/tempus2016/tabdeck-card/issues/171))

  ```yaml
  - name: Fan
    icon: mdi:fan
    icon_animation: "{{ 'spin' if is_state('fan.bedroom', 'on') else '' }}"
    card: { ... }
  ```

- **A tab can have its own font.** `font_size` (a plain number is px), `font_weight` and `font_family` set one tab's label. To change every tab, put them in `tab_defaults` or set `--tabdeck-tab-font-size`, `-font-weight` and `-font-family` in `styles`. In the editor they're the three **Label** fields on each tab. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#174](https://github.com/tempus2016/tabdeck-card/issues/174))

  ```yaml
  - name: Alarm
    font_weight: 700
    font_size: 16
    font_family: "Georgia, serif"
    card: { ... }
  ```

- **The tab bar can be compact or comfortable.** `density: compact` gives 36 px tabs, tighter padding and 13 px labels, for a phone or a busy bar. `density: comfortable` gives 56 px tabs and 15 px labels, for a wall tablet. A `--tabdeck-tab-height`, `--tabdeck-tab-padding` or `--tabdeck-tab-font-size` you set yourself still wins. In the editor it's **Tab bar density**. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#174](https://github.com/tempus2016/tabdeck-card/issues/174))

  ```yaml
  type: custom:tabdeck-card
  density: compact
  tabs: [ ... ]
  ```

- **The companion app can vibrate when you change tab.** `haptic` takes `selection`, `light`, `medium`, `heavy`, `success`, `warning` or `failure`, and `true` means `selection`. It fires when the person changes tab, by tap, swipe, arrow key or shortcut. Changes the card makes by itself, such as `auto_rotate`, `idle_return` and remote control, don't vibrate, and neither does anything while you're editing the dashboard. A browser without the companion app ignores it. In the editor it's **Vibrate on tab change**. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199), for [#173](https://github.com/tempus2016/tabdeck-card/issues/173))

  ```yaml
  type: custom:tabdeck-card
  haptic: light
  ```

## Changed

- **Colour names that are also HA colour names follow your theme.** `red`, `pink`, `purple`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`, `brown`, `grey`, `black` and `white` used to be the plain CSS colours. They're now your theme's colour of that name, as in HA's own cards, so with the default theme `red` is `#f44336` instead of `#ff0000` and `blue` is `#2196f3` instead of `#0000ff`. ([#199](https://github.com/tempus2016/tabdeck-card/pull/199))

## Upgrading

Through HACS, no action needed: update and reload the browser.

If you install by hand, copy both `tabdeck-card.js` and `tabdeck-card-editor-Bk4KA5s7.js` from the release into `config/www/`, and delete the older `tabdeck-card-editor-….js` file there. Keep registering `/local/tabdeck-card.js` as before. The [Installation](https://github.com/tempus2016/tabdeck-card/wiki/Installation) page has the details.

One change alters what an existing configuration looks like:

- A deck that sets `accent`, `color`, `badge_color`, `ring_color` or `bar_background` to one of the names under Changed now gets the theme's shade of that colour. To keep the exact old colour, write it as a hex value: `color: "#ff0000"` instead of `color: red`.

The new options are described on [Theming](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Theming), [Presets](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Presets) and [Tab look](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Tab-Look).

**Full changelog:** https://github.com/tempus2016/tabdeck-card/compare/v1.4.0...v1.5.0

## v1.4.0 — 2026-11-02

### Added
- **Faster dashboards** — the visual editor (with its helpers and translations) is now a separate file, `tabdeck-card-editor-<hash>.js`, loaded only when the card editor is opened. The card file dashboards load drops from 82 KB to 41 KB gzipped. HACS installs both files; manual installs copy both to `config/www/`.
- **Tab defaults and templates** — `tab_defaults` applies keys to every tab (including generated ones); `tab_templates` names blueprints a tab fills with `use` + `vars` (`{{ item.<var> }}`). The editor keeps both short in the YAML.
- **Debug panel** — `debug: true` shows each tab's conditions (✓/✗), badge, alert and lock state, why the deck started on its tab, the live template results, and build / render timings.

## v1.3.0 — 2026-10-31

### Fixed
- **Conditions edited in the visual editor** — Home Assistant's condition editor now saves `entity_id` instead of `entity`, so `state` / `numeric_state` conditions made in the UI (tab visibility, `alert`, `default_if`) were never met. Both keys are read now; a list in `entity_id` must match for every entity.

### Added
- **More auto-tab sources** — `auto_tabs.source` adds `floors`, `domains`, `devices`, `todo`, `calendars`, `cameras` and `zones`, each with a fitting default card (to-do list, calendar, camera, zone map with a people count); `content: tiles` gives area / floor / label tabs tile grids.
- **Auto content** — a tab with `area`, `floor` or `label` (and optional `domains`) and no card shows tiles of its entities, following HA's registry live.
- **Count badges** — `badge: { count: light.*, state: on, area: kitchen }` counts entities without Jinja.
- **Badge icons and progress rings** — `badge_icon` shows an icon as the badge; `ring` (entity, template or number, out of `ring_max`) draws a progress ring around the tab icon.
- **Alerting tabs first** — `alert_first` moves tabs with an active alert to the front; `alert_snooze` lets a long-press silence a pulse for N minutes.
- **Starting tab by time or device** — `default_by_time` (`{"06:00": Morning}`) and `default_by_device` (browsers named once with `?tabdeck_device=`, or browser_mod IDs).
- **Remote control** — `remote_entity` follows an entity (an automation sets an `input_text` to a tab name); `remote_event` switches on `tabdeck_select` events and `fire_event` fires `tabdeck_tab_changed` (both admin users only, as HA requires).
- **PIN-locked tabs** — `pin` asks for a code before a tab opens (`pin_timeout` for how long it stays unlocked). A convenience lock, not security.

## v1.2.1 — 2026-10-28

### Fixed
- **Template badges and conditions after a layout change** — when Home Assistant moved the card in the page (it does this while laying out a dashboard), template badges and template visibility stayed empty until some entity changed. They now come back straight away.

## v1.2.0 — 2026-10-28

### Added
- **Masonry inside a tab** — `layout: masonry` balances a tab's `cards` into columns like HA's masonry view (`columns`, or `min_column_width` to fit the width).
- **Sections inside a tab** — `layout: sections` lays out titled groups of cards like HA's sections view: HA heading cards (with `badges`), a 12-column card grid that honours `grid_options.columns` and each card's default width, sections auto-fitting up to `max_columns` (default 4) with `column_span`, stacking to one column on phones.
- **Header and footer cards** — `header_cards` / `footer_cards` stay on screen on every tab (a summary row above the tabs, controls below).
- **Tab backgrounds** — a tab's `background` (colour, gradient, CSS variable or image path / URL; may be a template) fills the content area while it's open.
- **Content height** — `content_height: tallest` keeps the tallest tab's height so the page doesn't jump; a fixed `content_height` or `content_max_height` scrolls inside the card.
- **Full screen** — `fullscreen: true` adds a button to the bar that opens the active tab over the whole window (Esc or the corner button closes it).
- **Swipe peek** — `swipe_peek: true`: while swiping, the content follows the finger and the neighbouring tab slides in; release past a third (or flick) to change tab.
- **More transitions** — `scale`, `flip` and `rise`, plus `transition_duration` and `transition_easing`; `slide` and `flip` now come in from the direction of travel. `transition_narrow` picks a different transition (e.g. `none`) on cards narrower than `narrow_width`.
- **Visual regression tests** — CI screenshots every demo example (desktop, phone, light theme) and compares it pixel by pixel with saved baselines (`npm run test:visual`).
- **Home Assistant compatibility check** — a monthly workflow runs the card in fresh Home Assistant `stable` and `beta` containers (dashboard, HA cards inside the deck, visual editor) and keeps a "works with Home Assistant" badge in the README up to date (`npm run test:ha` runs it against your own instance).
- **Free unused tabs** — `unload_after: <minutes>` releases the card of a tab that hasn't been on screen for that long and rebuilds it when it's opened again.

## v1.1.0 — 2026-10-27

The biggest Tabdeck release yet: **nearly 40 new features**. Tabs can now **react to your home** (live icons, alerts, formatted badges), the card can **run a wall panel** by itself, the deck can be a **phone-style dock**, a **dropdown menu** or a **side-by-side split view**, and the editor can **build a deck for you** from your own entities or **convert one from another card**. It also speaks **eight languages**, and there's a **[live demo](https://tempus2016.github.io/tabdeck-card/)** to try everything in the browser before you install it.

Every new feature is opt-in. **Nothing needs migrating** and existing dashboards look and behave exactly as before.

---

### 🎮 New: try it in your browser
- **[Live demo](https://tempus2016.github.io/tabdeck-card/)**: a playground with example decks, a YAML box you can edit, and pretend devices (guest mode, a garage door, lights) that switch visibility, badges and alerts live. No Home Assistant needed.
- **[Showcase](https://github.com/tempus2016/tabdeck-card/wiki/Showcase)**: a wiki page of community decks and starter ideas. Share yours with the new *Show and tell* discussion form (screenshot, YAML and a tick-box to agree to it being featured).

### ✨ New: the editor builds decks for you
- **[Starter templates](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Starter-Templates)**: *Start from a template* builds a working deck from **your own entities**: Rooms, Lights, Security, Media, Climate, Energy or Family. Replace the current tabs or add to them.
- **[Convert from another card](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Convert)**: paste a `tabbed-card`, `swipe-card`, `state-switch`, Bubble Card pop-ups, a stack or grid (split at `heading` cards), `conditional` cards, a sections view or a whole dashboard, and get Tabdeck tabs back. Options are mapped across, and anything that couldn't be carried over is explained.
- **[Why is this tab hidden?](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Condition-Check)**: the editor checks each tab's conditions against live state. *Hidden now* and *Alerting* chips show on the tab list, and each condition gets a ✅ or ❌ with the current value, any missing entity and live template results.
- **Condition builders**: Visibility, Alert and Default-when conditions use Home Assistant's own condition editor. Tabdeck-only types such as `template` edit as YAML in place. (#110)
- **Copy and import tabs**: copy a tab's config to the clipboard (works over plain http too) and paste one or several tabs back in. (#111)

### 🏠 New: tabs that react to your home
- **[Live icons, names and colours](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Templated-Fields)**: a tab's `icon`, `name`, `subtitle`, `color` and `accent` can be Jinja templates, so the Garage tab can turn red with an open-door icon while it's open. (#100)
- **[Alert pulse](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Alert)**: per-tab `alert` conditions make a tab pulse in `--tabdeck-alert-color` while they're met. With reduced motion on, it's a steady tint instead. (#102)
- **[Badge formatting](https://github.com/tempus2016/tabdeck-card/wiki/Badges)**: `badge_format: { precision, unit, max }` turns `21.456` into `21.5°` and `150` into `99+`. Set it per tab or once for the whole card. (#101)
- **[A tab per area or label](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dynamic-Tabs)**: `auto_tabs: { source: areas | labels }` builds a tab for every area (with its icon) or label, listing its entities. No Jinja needed. (#112)
- **[Tab-change actions](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Enter-Leave-Actions)**: `enter_action` / `leave_action` run any HA action when a tab opens or closes, for example turning a camera stream on only while its tab is showing. (#106)

  ```yaml
  - name: Garage
    icon: "{{ 'mdi:garage-open' if is_state('cover.garage', 'open') else 'mdi:garage' }}"
    color: "{{ 'var(--error-color)' if is_state('cover.garage', 'open') else '' }}"
    alert:
      - condition: state
        entity: cover.garage
        state: open
  ```

### 🖥️ New: wall panels and kiosks
- **[Auto-rotate](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Kiosk)**: `auto_rotate: 15` cycles through the tabs and pauses whenever someone touches the screen. (#103)
- **Idle return**: `idle_return: 120` goes back to the default tab after two minutes with nobody using it. (#103)
- **[Remote control from HA](https://github.com/tempus2016/tabdeck-card/wiki/Navigation-and-Persistence)**: with `remember: entity`, the card now follows its helper entity live, so an automation or Node-RED flow can change the tab on every panel at once. (#99)
- **[Edit mode helpers](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Edit-Mode)**: while you edit the dashboard, hidden tabs appear faded with an eye-off marker so you can still reach them, and rotation and idle return pause.

### 🧭 New: more ways to lay out a deck
- **[Dock](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dock)**: `dock: true` pins the bar to the bottom of the screen like a phone app's navigation, with the icon over the label, badges on the icon, and room left for the home bar and HA's sidebar.
- **Floating action tabs**: `fab: true` makes a tab a raised round button that floats above the dock. Pair it with `tap_action`.
- **[Grouped tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Grouped-Tabs)**: a tab with `children:` holds sub-tabs, shown as a second row or, with `children_display: menu`, as a ▾ dropdown on the tab.
- **[Split view](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Responsive)**: `split: 900` shows every tab side by side as columns once the card is at least 900 px wide. (#108)
- **Narrow screens**: `tab_display_narrow` switches to, say, icon-only tabs when the card is narrow. (#108)
- **Expand the selected tab**: `tab_display: active` shows icons only, except the selected tab, which also shows its name. Suggested by the community in discussion #93.
- **[Pagination dots and content arrows](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dots-Arrows)**: `tab_display: dots` swaps the tabs for a row of dots, and `content_arrows: true` adds ‹ › buttons beside the content.
- **Expanding side rail**: `rail_expand: true` keeps a left or right bar as an icon rail that slides its labels out on hover or keyboard focus.
- **[Scroll-spy](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Scroll-Spy)**: `scroll_spy: true` stacks every tab as one long page. The bar jumps to each section and highlights the one you're reading. (#105)
- **[Collapsible](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Collapsible)**: `collapsible: true` folds the content away when you tap the open tab again. `start_collapsed` starts folded. (#107)
- **`hide_bar`**: content only, no tab bar.

### 🎨 New: styling
- **[Style presets](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Presets)**: `preset: ios | material | glass | minimal | rail` applies a whole look in one line. Anything you set yourself still wins, and the editor's preset picker fills the values into the form so you can tweak from there. A new `--tabdeck-bar-backdrop` variable gives frosted bars. (#109)
- **Per-tab styles**: a tab's own `styles` apply while it's open, for example a different accent colour per room. (#113)

### ⌨️ New: getting around faster
- **[Quick-switch search](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Search-Hotkeys)**: `search: true` adds a 🔍 filter that ignores case and accents and searches names and subtitles. Use ↑ ↓ and Enter to pick a tab.
- **Keyboard shortcuts**: `hotkeys: true` gives 1 to 9 for tabs, `[` `]` to step and `/` to search. They're ignored while you're typing.
- **Back button**: `history: true` makes the browser's Back button, or the phone's back gesture, return to the previous tab.
- **[Arrange your own tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Customize)**: `customize: true` lets each person reorder and hide tabs for themselves. It's saved in their browser and never changes the dashboard config.
- **[Navigation tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Navigation-Tabs)**: a tab with `tap_action` runs an action, such as `navigate` to another view, instead of opening. (#104)
- **Friendlier deep links**: `#tab=living-room` now matches the *Living Room* tab, ignoring case. (#99)

### 🌍 New: eight languages
The editor and the card's own text follow your Home Assistant language: **English, Deutsch, Español, Français, Italiano, Nederlands, Polski and Português**. Regional variants use the base language, and anything not yet translated shows in English. See [Languages](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Languages) if you'd like to help translate.

### 🔌 New: for scripts and other cards
- `selectTab(nameOrIndex)`, `selectedTab`, and a `tabdeck-tab-changed` event on every tab change, for browser_mod, scripts and other cards.

---

### 🐛 Fixed
- **Sticky bars no longer hide under Home Assistant's header.** They now pin just below it. Override the position with `--tabdeck-sticky-top`. (#105)
- **Actions picked in HA's action editor now run.** `perform-action` (what the picker writes) works for `hold_action`, `badge_action` and `tap_action`; before, only the older `call-service` did. (#106)
- **Content beside a left or right tab bar fills the card** instead of shrinking to fit its content.
- **The editor's Add tab icon shows** on current Home Assistant builds.
- **Swiping skips disabled tabs** instead of landing on them.
- **A `0.0` badge counts as zero**, so `hide_inactive_badge` hides it and dot mode shows no dot.

---

### Upgrading
Update via **HACS**, then **hard-refresh your browser** (Ctrl/Cmd + Shift + R) so the new card loads. Nothing needs changing in your config.

Full details for each feature are on the [Wiki](https://github.com/tempus2016/tabdeck-card/wiki).

**Full changelog:** https://github.com/tempus2016/tabdeck-card/compare/v1.0.0...v1.1.0

## v1.0.0 — 2026-06-24

First stable release of **Tabdeck Card** — a dependency-free, themeable tabbed Lovelace card with a full visual editor and keep-alive content (maps, cameras and graphs render correctly without the "navigate away and back" workaround). Every capability below is an opt-in option, unit-tested, verified on a real Home Assistant instance, and documented on the [Wiki](https://github.com/tempus2016/tabdeck-card/wiki).

### Added — Tab bar & styling
- **Five bar styles** — `style: underline | pill | segmented | boxed | text | rail`. `boxed` renders each tab as a bordered chip, `text` drops the indicator entirely, and `rail` is a compact icon rail for `position: left/right`.
- **Display modes** — `tab_display: both | icon | label` to show icons, labels, or both; icon-only falls back to the label for tabs without an icon so a tab is never empty.
- **Indicator controls** — `accent_indicator` colours the moving indicator by the selected tab's `accent`; `indicator_size` sets the underline thickness; `indicator_radius` overrides the pill/segmented/boxed/rail corner radius.
- **Alignment** — `align: start | center | end | justify` distributes the tabs along the bar.
- **Bar surface** — `sticky` pins the bar while content scrolls; `elevation` adds a shadow; `bar_background` sets a custom bar colour.
- **Overflow handling** — `scroll_buttons` adds ‹ › arrows and `overflow_menu` adds a ⋯ jump-to-tab menu, both appearing only when the bar overflows.

### Added — Per-tab options
- **Labelling** — per-tab `name`, `subtitle` (secondary line), `icon`, `accent`, and `color` (fixed label/icon colour independent of selection).
- **Badges** — `badge` from an entity state or Jinja template, with `badge_display: text | dot`, per-tab `badge_color`, and a global `hide_inactive_badge` to drop 0/off badges.
- **Actions** — `hold_action` (long-press a tab) and `badge_action` (click a badge) fire any Home Assistant action without disrupting tab selection.
- **Disabled & sizing** — `disabled` greys out a tab and skips it in keyboard nav; `card_size` provides a `getCardSize()` hint for stable masonry sizing.
- **Multiple cards** — `cards: [...]` stacks several cards in one tab, with optional `columns: N` for a grid; tabs can also nest another Tabdeck card for sub-tabs.

### Added — Dynamic behaviour
- **Rich visibility** — `visibility` conditions support `state`, `numeric_state`, `screen`, `time` (with overnight ranges + weekday), `user`, `template`, and nestable `and` / `or` / `not` groups.
- **Auto-select** — `auto_select` switches to a tab (edge-triggered) when an entity becomes active or enters a given state.
- **Conditional default** — `default_if` picks the starting tab based on current state.
- **Transitions** — `transition: fade | slide` animates the panel on tab switch (respects reduced-motion).

### Added — Navigation & persistence
- **Selection memory** — `remember: none | browser | url | entity`; `entity` mode syncs the active tab across devices via an `input_number`/`input_text`, and `storage_key` isolates browser-mode persistence.
- **Gestures & keyboard** — touch `swipe` and desktop `swipe_mouse` (with optional `swipe_wrap`), plus full keyboard navigation (arrows / Home / End, skipping disabled tabs).
- **Performance** — `lazy` mounting and `unmount_hidden` for memory-heavy dashboards; tab-bar resize handling is debounced.

### Added — Visual editor
- Collapsible per-tab blocks (with expand-all / collapse-all and auto-expand on add), **drag-to-reorder**, duplicate-tab, and duplicate-name warnings.
- A live tab-bar **preview**, a card-type chooser with common built-in **and** popular custom (HACS) card presets, and Home Assistant's native card editor on drill-in.

### Added — Theming, accessibility & docs
- `styles` passthrough for CSS variables (no card-mod needed) and an optional content `header` showing the active tab's title.
- Proper `tablist` semantics: `aria-selected`, roving `tabindex`, focus rings, badge labels, and a configurable `aria_label`.
- A complete GitHub **Wiki**, refreshed README with status badges, and `examples/demo.yaml`.

### Upgrading
Install or update via **HACS** (or copy `tabdeck-card.js` to `config/www/` and add it as a dashboard resource), then refresh your browser. Existing `kinghat/tabbed-card` configs keep working — `options.defaultTabIndex` maps to `default_tab` and per-tab `attributes.label`/`attributes.icon` map to `name`/`icon`.
