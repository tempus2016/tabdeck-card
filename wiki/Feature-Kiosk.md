# Wall-panel options: auto-rotate, idle return & screensaver

Two options for wall tablets and kiosk dashboards. **`auto_rotate`** cycles through the tabs on a timer, and **`idle_return`** snaps back to the default tab after a period of inactivity.

## `auto_rotate`

```yaml
type: custom:tabdeck-card
auto_rotate: 15          # advance every 15 s
tabs: [ ... ]
```

or with an explicit pause:

```yaml
auto_rotate:
  interval: 15           # seconds between advances (minimum 2)
  resume_after: 60       # after a touch, hold for 60 s before rotating again (default 60)
```

- Visits every **visible, enabled** tab in order and wraps around. Disabled tabs are skipped.
- **Any touch, click, key press or scroll** on the card pauses rotation for `resume_after` seconds, so someone using the panel isn't moved on mid-read.
- Rotated selections are **not remembered**: they never overwrite `remember: browser/url/entity`, so they won't flood an `input_number` with writes or move other devices along.

## `idle_return`

```yaml
type: custom:tabdeck-card
default_tab: Home
idle_return: 120         # back to Home after 2 min without interaction (minimum 5)
tabs: [ ... ]
```

- After `idle_return` seconds with no touch, click, key press or scroll on the card, it returns to the **default tab**. That's the first tab whose [`default_if`](Feature-Conditional-Default) matches, otherwise `default_tab`.
- The return isn't remembered either, so the user's last explicit choice is still what `remember` restores.
- Ignored when `auto_rotate` is set (rotation already brings the panel back to life).

## Screensaver (`idle_dim`)

After some minutes with no touch anywhere on the dashboard, the screen dims, turns black or shows a large clock. A touch or a key press wakes it, and that touch is used up waking the screen, so it doesn't press whatever was underneath.

```yaml
type: custom:tabdeck-card
idle_dim: 5                # dim after 5 minutes

# or
idle_dim:
  after: 10                # minutes
  mode: clock              # dim (default), black or clock
  opacity: 0.8             # how dark "dim" gets (0–1, default 0.7)
```

- **dim** darkens the dashboard so it's still readable from across the room. **black** blanks it, which on an OLED tablet saves the screen. **clock** shows the time and date in the dashboard's language, in 12- or 24-hour time as set in your HA profile.
- It covers the whole dashboard, header and sidebar included, not just the card.
- Any touch, click, key or scroll on the page counts as activity, not just on the deck.
- It works with `idle_return`: the deck can return to Home after 2 minutes and dim after 5.
- It doesn't dim while the dashboard is being edited.
- It's a layer on the page, so the tablet's own screen stays on. To switch the screen off as well, use the Fully Kiosk or companion-app screen settings.
- Put it on one deck per dashboard. Each deck that has it shows its own layer.

## Quiet hours (`quiet_hours`)

At night the deck stops doing things by itself. Tabs you tap still open.

```yaml
type: custom:tabdeck-card
quiet_hours: "22:00-07:00"

# or with a helper (quiet while it's on), or both:
quiet_hours:
  from: "22:00"
  to: "07:00"
  entity: input_boolean.guests_asleep
```

While quiet:

- nothing switches tabs by itself: `auto_rotate`, `idle_return`, `remote_entity`, `remote_event`, `follow_room`, `takeover` and `auto_select` are ignored (not saved for later);
- alerting tabs keep their colour but stop pulsing, and badges don't bounce;
- the click sound (`click_sound`) is silent.

Things the person does work as usual, and so do `remember: entity` and `sync_group`, which follow a choice made on another screen. The window runs from `from` up to (not including) `to`, may run over midnight, and uses the tablet's clock. The card gets a `quiet` attribute while it applies, for card-mod. YAML only.

## Keep the screen on (`keep_awake`)

A tab with `keep_awake: true` stops the tablet's screen from turning off while it's open, for a camera, a recipe or a timer you watch from across the room:

```yaml
tabs:
  - name: Recipes
    keep_awake: true
    card: { ... }
```

- The screen may sleep again as soon as another tab opens, the dashboard is left, or the browser goes to the background; coming back to the tab keeps it on again.
- It uses the browser's Screen Wake Lock, which only works when the dashboard is opened over **https** (for example through Nabu Casa or your own certificate) or on `localhost`. Over plain `http://192.168.x.x:8123` the browser doesn't offer it and the option does nothing (a debug line in the browser console says so). Fully Kiosk's own "keep screen on" setting works either way.
- For every tab, use `tab_defaults: { keep_awake: true }`.
- It does nothing while the dashboard is being edited. `idle_dim` still dims the dashboard on top; only the device's own sleep is held off.

Editor: "Keep the screen on while this tab is open" in each tab's options.

## Click sound (`click_sound`)

A soft "tick" each time someone switches tabs, so a wall panel feels like it answered the tap:

```yaml
type: custom:tabdeck-card
click_sound: true    # volume 0.3
# or a volume from 0 to 1:
click_sound: 0.6
```

- The sound is made by the browser (Web Audio), so there's no sound file to host.
- Only switches the person makes click: taps, swipes, keys. `auto_rotate`, automations and the other automatic switches stay silent, and so does everything in `quiet_hours`.
- Browsers only allow sound after the page has been touched, so the first tap after loading the dashboard may be silent on some tablets.
- The tablet's own volume and silent switch still apply.

Editor: the "Click sound on tab change" volume slider (`0` is off).

## Editor

All three are in the visual editor as **Auto-rotate tabs every (seconds)**, **Return to default tab after idle (seconds)** and **Dim the screen after (minutes idle)** with **When idle, show**, where `0` means off. A `resume_after` set in YAML is kept when you change the interval in the editor.

## Offline banner (`offline_banner`)

On a wall panel you can't always tell that the screen has stopped updating. With **`offline_banner: true`** a red bar saying **Connection lost · reconnecting…** appears over the deck's content when the connection to Home Assistant drops, and goes away by itself once it's back.

```yaml
type: custom:tabdeck-card
offline_banner: true
tabs: [ ... ]
```

- It waits 2 seconds before showing, so the quick reconnects that happen when a tablet wakes up don't flash it.
- The icon is drawn by the card itself, so it shows even when the browser can't fetch anything.
- While it shows, the card has an `offline` attribute (style it with card-mod, e.g. `:host([offline]) { opacity: .8 }`), and the colours follow `--tabdeck-offline-background` / `--tabdeck-offline-color` (default HA's error colour on white).
