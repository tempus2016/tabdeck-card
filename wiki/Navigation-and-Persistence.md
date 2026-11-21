# Navigation & Persistence

## Selecting tabs

- **Click / tap** a tab.
- **Keyboard** (when the bar is focused): <kbd>←</kbd>/<kbd>→</kbd> (or <kbd>↑</kbd>/<kbd>↓</kbd> for left/right bars) move between tabs and wrap around; <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last.
- **Swipe** (optional): set `swipe: true` to change tabs with a left/right swipe on touch devices, or `swipe_mouse: true` to do the same with a left/right **mouse drag** on desktop. Both honour [`swipe_wrap`](Feature-Performance).

## Remembering the selected tab

The `remember` option controls what happens when you leave and return:

| Mode | Behaviour |
| --- | --- |
| `none` (default) | Always start on `default_tab`. |
| `browser` | The selected tab is saved in `localStorage`, per dashboard + tab set, on that browser. It's saved by name, so it finds the same tab when the order changes (`customize`, `sort_by_usage`, `alert_first`). |
| `url` | The selected tab is written to the URL hash (`#tab=<name>`), so links and reloads keep it and it can be deep-linked/shared. |
| `entity` | The selected **index** is stored in a Home Assistant helper entity, so the active tab syncs across **all devices**. Set `remember_entity` to an `input_number` or `input_text`. |

### Cross-device with `remember: entity`

```yaml
type: custom:tabdeck-card
remember: entity
remember_entity: input_number.kitchen_deck_tab
tabs: [ ... ]
```

On load the tab is restored from the entity's value; on every switch the card writes the new index back (`input_number.set_value` / `input_text.set_value`). Because it's a real entity, the choice follows you to every dashboard and device.

**Live two-way sync.** The card also *watches* the entity. When anything else changes it (another device, an automation, a Node-RED flow, a voice command), every open card switches to that tab straight away, with no reload. That makes the helper a remote control for your wall panels:

```yaml
# automation: show the Cameras tab (index 2) when the doorbell rings
triggers:
  - trigger: state
    entity_id: binary_sensor.doorbell
    to: "on"
actions:
  - action: input_number.set_value
    target: { entity_id: input_number.kitchen_deck_tab }
    data: { value: 2 }
```

- Only a real change of the entity's value switches tabs, so a routine state update never pulls you off the tab you picked.
- Out-of-range values (e.g. `9` on a 3-tab deck) are ignored.
- Echoes of the card's own recent writes are ignored, so tapping quickly through several tabs never bounces back.

### `storage_key` (browser mode)

By default `browser` mode keys storage by dashboard path + tab names. Set `storage_key: my-deck` to give a deck its own slot — useful when two identical decks would otherwise share state.

```yaml
type: custom:tabdeck-card
remember: url
default_tab: Climate
tabs: [ ... ]
```

### Deep links (`#tab=`)

With `remember: url` (or any mode, on first load), a `#tab=` hash selects a tab. It can be:

- the tab's **index**: `#tab=2`
- the tab's **name**: `#tab=Living%20Room`
- a **case-insensitive slug** of the name: `#tab=living-room`, `#tab=LIGHTS`

An exact name match wins over a slug match.

### Share button (`share_button`)

**`share_button: true`** adds a share button to the bar. Tapping it copies a direct link to the open tab, such as `…/lovelace/home#tab=cameras`, and shows the link under the button. **`share_button: qr`** shows the link as a QR code too, which is the quickest way to point a new wall tablet at the right tab: scan it with the tablet's camera.

```yaml
type: custom:tabdeck-card
share_button: qr     # or true for the link alone
tabs: [ ... ]
```

- The link uses the tab's slug (its index when the name has no letters or digits), so it keeps working if you reorder tabs.
- With `share_button` on, a deck opens the tab a `#tab=` link names whatever `remember` is set to. Without it, only `remember: url` reads links.
- On plain `http://` dashboards the browser has no clipboard API, so the card copies the old-fashioned way. If that is blocked too, the panel says **Copy this link** and you can copy it from the box.
- The QR code is drawn in your browser. The link isn't sent to any service.
- Tap outside the panel, press **Esc** or switch tab to close it.
- If several decks on one page read links, each opens its tab of that name.

### Notes

- With `remember: url`, give your tabs **unique names** so the hash maps unambiguously.
- `default_tab` still applies as the fallback when no remembered value is found.
- Lazy-mounted tabs (`lazy: true`) keep state once built; switching away does not destroy them.


## Back button (`history`)

With **`history: true`** every tab you open becomes a browser history entry. The phone's **back gesture** or the browser's **Back** button then returns to the previous tab instead of leaving the dashboard. Forward works too.

```yaml
type: custom:tabdeck-card
history: true
remember: url      # optional: each entry also gets its #tab= link
tabs: [ ... ]
```

- Only switches **you** make are recorded. Auto-rotate, idle return, `auto_select` and entity sync don't add entries.
- Entries are tagged per deck, so Home Assistant's own history (views, more-info dialogs) isn't disturbed. Back with a dialog open closes the dialog and leaves the tab alone.
- Combine with `remember: url` and each entry also carries its `#tab=` link.

## Scroll memory (`scroll_memory`)

With `scroll_memory: true`, each tab remembers how far down the page you'd scrolled. Switch to
another tab and back, and you're where you left off instead of wherever the other tab left the page.

```yaml
type: custom:tabdeck-card
scroll_memory: true
```

- It remembers the page's position and, when `content_height` / `content_max_height` make the
  content scroll inside the card, that too.
- A tab you haven't scrolled yet opens with the page where it is, as without the option.
- Positions are kept per deck and tab until the page is reloaded. Not used with `scroll_spy`,
  where scrolling is how you move between tabs.

## Last-tab toggle (`last_tab_button`)

**`last_tab_button: true`** adds a swap button at the end of the bar, labelled with the tab you had open before. Tapping it goes back there, and tapping it again flips back, so two tabs you keep moving between are one tap apart.

```yaml
type: custom:tabdeck-card
last_tab_button: true
tabs:
  - { name: Lights, card: { type: tile, entity: light.kitchen } }
  - { name: Cameras, card: { type: picture-entity, entity: camera.front_door } }
```

- The button appears after the first switch. It shows only the icon when `tab_display` is `icon` or `dots`.
- With `hotkeys: true`, **l** does the same.
- If the last tab has since been hidden by its visibility conditions or disabled, the button goes away until you switch again.
- Automations can do the same with `tab: back` in a `tabdeck_select` event (see [Remote control & events](Feature-Remote-Control#events-remote_event-fire_event)).
