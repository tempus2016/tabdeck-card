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
- A [PIN-locked tab](Feature-PIN) isn't opened unless someone entered its code in this browser within `pin_timeout`: the deck stays where it is. A PIN keeps a tab from whoever is at the screen, so an automation can't put it on screen. With `debug` on, the console says why.
- Prefer names over indexes when `alert_first` or `customize` can change the order.

## Follow the room (`follow_room`)

Works for **every user**. A room-presence entity (Bermuda, ESPresense, a template sensor, or an `input_select` an automation sets) says which room you are in, and the deck shows that room's tab:

```yaml
type: custom:tabdeck-card
follow_room: sensor.johns_phone_area
tabs:
  - { name: Lounge, area: living_room, card: { ... } }
  - { name: Kitchen, area: kitchen, card: { ... } }
  - { name: Bedroom, card: { ... } }
```

The entity's state picks the tab, checked in this order:

1. `map`, if given: `{ <state>: <tab name, slug or index> }`;
2. a tab whose `area` matches the state, by area id (`living_room`) or area name (`Living Room`);
3. a tab whose name matches (`bedroom` opens *Bedroom*).

Case, spaces and punctuation don't matter. Anything else (`not_home`, `unknown`, a room without a tab) leaves the deck where it is.

```yaml
follow_room:
  entity: sensor.hall_tablet_room
  map:
    hallway: Home
    garden: Outside
```

- Only **changes** switch the tab, so the room the entity reports when the page loads doesn't, and the person can still pick another tab: it only moves again when the room changes.
- It waits while someone is using the card (see below), and it never opens a PIN-locked tab.
- A tab's `area` is the same key that fills a tab with that area's entities when it has no card; with a card of its own, the tab just keeps its card.
- These switches aren't remembered.
- A sensor that flips between two rooms will flip the deck too. Smooth it first, for example with a template sensor that only changes after the room has been the same for 10 seconds.

Editor: "Follow the room" entity picker.

## Doorbell takeover (`takeover`)

Works for **every user**. When the doorbell rings, the deck jumps to the camera tab with a banner and a countdown, then goes back to the tab that was open:

```yaml
type: custom:tabdeck-card
takeover:
  entity: binary_sensor.doorbell
  tab: Cameras
  duration: 20
  message: Someone's at the door
  icon: mdi:doorbell
tabs: [ ... ]
```

The banner shows the icon, the message (default: the tab's name) and "Back to Home in 0:20". Then:

- when the time is up, the deck goes back to the tab that was open before;
- the banner's **×** goes back at once;
- opening another tab (a tap, or anything else that switches) ends the takeover there, without going back;
- a second ring while the banner shows restarts the countdown and keeps the way back to the first tab.

| Key | Default | |
|---|---|---|
| `entity` | — | What starts it. |
| `state` | `on` | Start when the entity enters this state. `event` and `button` / `input_button` entities start on every press (their state is the time of the last press). |
| `tab` | — | The tab to show: name, slug or index. |
| `duration` | `30` | Seconds before going back (5 to 3600). |
| `message` | tab name | Banner text. |
| `icon` | `mdi:bell-ring` | Banner icon. |

`takeover` can be a list, for several triggers (doorbell, smoke alarm, gate). Only **changes** start a takeover, never the state at page load. It switches straight away, even while someone is using the card, because a doorbell can't wait. A takeover aimed at a [PIN-locked tab](Feature-PIN) doesn't start (no banner, no switch) unless the tab was unlocked within `pin_timeout`; pick a tab without a PIN for the doorbell. `auto_rotate` and `idle_return` hold while it runs. It isn't remembered. Colours: `--tabdeck-takeover-background` (default the theme's warning colour) and `--tabdeck-takeover-color`.

From an automation, send `takeover` with a `tabdeck_select` event (needs `remote_event: true` and an admin user, like every event):

```yaml
actions:
  - event: tabdeck_select
    event_data:
      tab: Cameras
      takeover: 20          # seconds, or true for 30
      message: Parcel delivery
      icon: mdi:package-variant
```

The **Take over the deck when the doorbell rings** blueprint (below) does this from a form.

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

Instead of a tab, `tab` can be a step word: **`next`**, **`previous`**, **`back`** (the tab that was open before this one) or **`default`** (the deck's starting tab). `next` and `previous` wrap around at the ends and skip disabled and [PIN-locked](Feature-PIN) tabs; `back` or `default` to a locked tab does nothing. A tab that's actually named *Next* or *Back* still wins. The same words work in `remote_entity`.

```yaml
actions:
  - event: tabdeck_select
    event_data:
      tab: next
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

## Blueprints

Ready-made automation blueprints drive `remote_event`, so you don't have to write the automation yourself. Import one, fill in the form, and save.

**Show a tab when something happens**: when an entity changes (to a state you pick), switch to a tab, and optionally go back to another tab after a while. For example: the doorbell rings, the hall panel shows Cameras, and two minutes later it's back on Home.

[![Import the blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Ftempus2016%2Ftabdeck-card%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftabdeck%2Fshow_tab_when.yaml)

**Take over the deck when the doorbell rings**: when an entity changes (a doorbell button or event entity, a motion sensor), the deck shows a tab with a banner and a countdown (30 seconds by default), then goes back to the tab that was open. The banner's × goes back at once. Unlike the blueprint above, it goes back to whatever was open, and the person sees how long is left.

[![Import the blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Ftempus2016%2Ftabdeck-card%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftabdeck%2Fdoorbell_takeover.yaml)

**"Show &lt;tab&gt;" with Assist**: say or type "show cameras", "show the lights tab" or "open the heating tab" to Assist, and the deck switches. You can change the sentences and the reply.

[![Import the blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Ftempus2016%2Ftabdeck-card%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftabdeck%2Fassist_show_tab.yaml)

**Next, previous and back with Assist**: say or type "next tab", "previous tab", "go back" or "home tab", and the deck steps through its tabs, returns to the one you had open before, or goes to its default tab. Each command's sentences can be changed.

[![Import the blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Ftempus2016%2Ftabdeck-card%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftabdeck%2Fassist_step_tabs.yaml)

**Step through tabs with a knob or remote**: turning a Zigbee rotary knob right or left steps to the next or previous tab, and buttons can go back to the last tab or to the default tab. Pick the device's action entity (an `event` entity from Zigbee2MQTT 2.x, ZHA or Matter, or an older Zigbee2MQTT action `sensor`) and list which action values do what. The defaults cover common knobs (`rotate_right` / `rotate_left`, `brightness_step_up` / `brightness_step_down`) and the IKEA five-button remote (`arrow_right_click` / `arrow_left_click`).

[![Import the blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Ftempus2016%2Ftabdeck-card%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Ftabdeck%2Fknob_step_tabs.yaml)

- The deck needs `remote_event: true`, and the browser showing it must be logged in as an admin user, because HA only lets admins hear custom events.
- **Only this deck** takes the deck's `event_id` (or `storage_key`), and **Only this device** takes a browser name set with `?tabdeck_device=`. Leave both empty to switch every deck with that tab on every device.
- The tab can be its name, its slug (`living-room`) or its position (`0` is the first).
- The blueprints are in the repository under [`blueprints/automation/tabdeck`](https://github.com/tempus2016/tabdeck-card/tree/main/blueprints/automation/tabdeck) if you'd rather copy them by hand.

## Voice commands as Assist intents

If you'd rather not use automations for voice, the repository has the same commands as custom sentences and an `intent_script`, in [`voice/`](https://github.com/tempus2016/tabdeck-card/tree/main/voice):

1. Copy `voice/custom_sentences/en/tabdeck.yaml` to `custom_sentences/en/tabdeck.yaml` in your config folder.
2. Add the `intent_script:` block from `voice/intent_script.yaml` to `configuration.yaml` (merge it into yours if you already have one).
3. Restart Home Assistant.

Then "show the cameras tab", "open the heating tab", "switch to the lights tab", "next tab", "previous tab", "go back" and "home tab" work in every Assist pipeline, including voice satellites. The decks still need `remote_event: true`. To limit a command to one deck or one browser, set `deck` or `device` in the `intent_script`.

A sentence trigger in an automation is matched before an intent, so with the Assist blueprints also installed, the blueprints answer the sentences they share.

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

## Learned default tab (`learned_default`)

```yaml
learned_default: true
```

Each browser counts which tab the person picks at each hour of the day. When the deck loads, it opens the tab picked most around this hour (the hour itself counts double, the hour before and after once), if it was picked at least 3 times and clearly more than any other tab. So a kitchen tablet that is switched to Kitchen most mornings starts opening on Kitchen in the morning by itself.

- Only switches the person makes are counted. `auto_rotate`, `idle_return`, automations and other devices aren't.
- It only decides the tab the deck opens on. It never switches while the deck is open, and `idle_return` still goes back to `default_tab`.
- It's the weakest rule: a remembered tab, a `#tab=` link, `default_if`, `default_by_device` and `default_by_time` all win (see the order below). A PIN-locked tab is never opened this way.
- A small note says why the tab opened ("Opened Kitchen: you often use it at this time"). It goes away when another tab is opened; its × hides it for good in this browser.
- Counts are kept in the browser's local storage (`tabdeck-learned:<deck>`), per deck. Old habits fade: an hour's counts halve once one passes 100.

| Key | Default | |
|---|---|---|
| `min_uses` | `3` | Picks around this hour before a tab is learned. |
| `notice` | `true` | `false` hides the note. |

```yaml
learned_default:
  min_uses: 5
  notice: false
```

Editor: the "Open the tab used most at this time of day" switch.

## Order of defaults

When the deck loads, the first rule that applies wins:

1. a remembered tab (`remember`), or a `#tab=` link;
2. a tab whose [`default_if`](Feature-Conditional-Default) conditions are met;
3. `default_by_device`;
4. `default_by_time`;
5. `learned_default`;
6. `default_tab`.

## Switches wait while someone is using the card

A tab change that something else asks for doesn't happen while someone is typing in a field or holding a slider on the deck. That covers `remote_entity`, `remote_event`, `follow_room`, `remember: entity` following another device, and `auto_select`. The switch waits until they let go or leave the field, then happens. `auto_rotate` skips its turn instead.

- "Typing" means a text field, number field, drop-down or text area inside the deck, inside any card on it. Checkboxes, buttons and toggles don't hold anything up.
- "Holding" means a finger or mouse button down anywhere on the deck, such as mid-way through dragging a brightness slider.
- If several switches arrive while it waits, the last one wins.
- It's always on. There's nothing to configure.

## Companion integration (`companion`)

The **Tabdeck Companion** integration (a small, separate custom integration) gives each browser's deck a **select entity**. Its options are the deck's tab names and its state is the open tab, so automations can see what a wall tablet shows and change it:

```yaml
type: custom:tabdeck-card
event_id: main      # the deck part of the entity id
companion: true
tabs: [ ... ]
```

```yaml
actions:
  - action: select.select_option
    target:
      entity_id: select.tabdeck_kitchen_tablet_main
    data:
      option: Cameras
```

- Install the integration (copy `custom_components/tabdeck`, restart, then **Settings → Devices & services → Add integration → Tabdeck Companion**). Each browser that opens the dashboard becomes a device **Tabdeck &lt;browser&gt;** with one select per deck.
- **Browser id:** `companion_id` in the card (only for a dashboard a single device shows), else the [device name](#default-tab-per-device-default_by_device) set once with `?tabdeck_device=kitchen_tablet`, else browser_mod's id, else a random id the card keeps in that browser.
- Only visible tabs that hold content are options. Picking one acts like `remote_entity`: a [PIN-locked tab](Feature-PIN) isn't opened (the entity stays on the open tab), the switch isn't remembered as the person's choice, and nothing happens in `quiet_hours`. A tap on the deck updates the entity at once.
- The entity is **unavailable** while no window shows the deck, and keeps its tab list over a restart.
- **Without the integration** the option does nothing and logs nothing. The card editor's preview never registers.
- Only signed-in users can register (HA's websocket), and the integration stores only ids, the browser label, tab names and the open tab.

## Usage stats (`usage_stats`)

Records how long each tab is on screen and reports it to Home Assistant in batches, so you can see which tabs a wall panel is really used for.

```yaml
type: custom:tabdeck-card
event_id: main
companion: true
usage_stats: true     # report every 10 minutes; or a number of minutes (1–60)
tabs: [ ... ]
```

- **With the [companion integration](#companion-integration-companion)** (`companion: true` and the integration installed), each deck gets a sensor such as `sensor.tabdeck_kitchen_tablet_main_usage`: its state is the total minutes, and its `tabs` attribute holds the minutes per tab, busiest first (`{{ state_attr('sensor.tabdeck_kitchen_tablet_main_usage', 'tabs')['Cameras'] }}`). It only ever grows (`total_increasing`), so a [Utility Meter](https://www.home-assistant.io/integrations/utility_meter/) helper gives you minutes per day or week, and long-term statistics work.
- **Without it**, the card fires a **`tabdeck_usage`** event instead: `{ deck, device, minutes: { Home: 4.5, Cameras: 1.25 } }`. Firing events needs an admin user. Count it with an automation, e.g. add `trigger.event.data.minutes.Cameras` to an `input_number`.
- Only time while the page is visible counts, and not while the dashboard is being edited. What's collected is sent at each interval and when the deck leaves the screen (another view, page closed). Minutes are rounded to hundredths, and nothing is stored in the browser.
