# Remote control & events

Let Home Assistant drive the deck (a wall panel jumps to *Cameras* when the doorbell rings), tell HA which tab is open, and start on the right tab for the time of day or the device.

## Follow an entity (`remote_entity`)

Works for **every user**. Point the deck at an entity; whenever its state changes to a tab **name**, **slug** or **index**, the deck switches to that tab:

```yaml
type: custom:tabdeck-card
remote_entity: input_text.hall_panel_tab
tabs: [ ... ]
```

```yaml
# automation: show Cameras on the hall panel when the doorbell rings
triggers:
  - trigger: state
    entity_id: binary_sensor.doorbell
    to: "on"
actions:
  - action: input_text.set_value
    target:
      entity_id: input_text.hall_panel_tab
    data:
      value: Cameras
```

- An `input_text`, `input_select`, `select` or any sensor works; an `input_number` works with indexes (`2.0`).
- Only **changes** switch the tab, so the value the entity has when the page loads doesn't. To send the same tab twice, set the entity to something else in between (e.g. an empty string, which is ignored).
- Unlike [`remember: entity`](Navigation-and-Persistence#cross-device-with-remember-entity), the deck never writes to the entity, and these switches aren't remembered.
- PIN-locked tabs open without the code: the automation's author already has access to the config.
- Prefer names over indexes when `alert_first` or `customize` can change the order.

## Events (`remote_event`, `fire_event`)

Home Assistant only lets **admin** users fire and listen to custom events, so these two options work for admins; for everyone else they do nothing (a warning appears in the browser console).

**`remote_event: true`** switches on a `tabdeck_select` event:

```yaml
actions:
  - event: tabdeck_select
    event_data:
      tab: Cameras
      deck: hall            # optional: only the deck with event_id: hall
      device: hall-panel    # optional: only this browser (see below)
```

**`fire_event: true`** fires `tabdeck_tab_changed` whenever the tab changes, with `deck`, `tab`, `index`, `previous` and `device`:

```yaml
triggers:
  - trigger: event
    event_type: tabdeck_tab_changed
    event_data:
      deck: hall
      tab: Cameras
actions:
  - action: camera.turn_on
    target:
      entity_id: camera.driveway
```

**`event_id`** names the deck in both directions (default: `storage_key`).

## Default tab by time of day (`default_by_time`)

```yaml
default_by_time:
  "06:00": Morning
  "12:00": Day
  "18:30": Evening
```

The deck opens on the slot that started most recently; before the first slot, the last one still applies (overnight). Values are tab names, slugs or indexes. Combined with [`idle_return`](Feature-Kiosk), a wall panel drifts back to the right tab for the time of day.

## Default tab per device (`default_by_device`)

Give a browser a name once by opening the dashboard with `?tabdeck_device=hall-panel` in the URL; it's remembered in that browser. If [browser_mod](https://github.com/thomasloven/hass-browser_mod) is installed, its browser IDs work too.

```yaml
default_by_device:
  hall-panel: Cameras
  kitchen-tablet: Recipes
```

## Order of defaults

When nothing is remembered, the first tab that applies wins:

1. a tab whose [`default_if`](Feature-Conditional-Default) conditions are met;
2. `default_by_device`;
3. `default_by_time`;
4. `default_tab`.
