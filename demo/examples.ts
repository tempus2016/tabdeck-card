// Ready-made configs shown in the demo's example picker (YAML text, so the
// editor box shows exactly what you'd paste into Home Assistant).
export const EXAMPLES: { id: string; title: string; yaml: string }[] = [
  {
    id: "basics",
    title: "Basics",
    yaml: `type: custom:tabdeck-card
style: underline
tabs:
  - name: Lights
    icon: mdi:lightbulb
    badge: "{{ states.light | selectattr('state','eq','on') | list | count }}"
    card:
      type: entities
      entities: [light.kitchen, light.living_room, light.bedroom, light.porch]
  - name: Climate
    icon: mdi:thermostat
    badge: sensor.living_room_temperature
    badge_format: { precision: 1, unit: "°" }
    card: { type: thermostat, entity: climate.hall }
  - name: Media
    icon: mdi:television
    card: { type: media-control, entity: media_player.lounge_tv }
  - name: Guests
    icon: mdi:account-group
    visibility:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
    card:
      type: markdown
      content: Wi-Fi password is on the fridge.
`,
  },
  {
    id: "alerts",
    title: "Alerts & live icons",
    yaml: `type: custom:tabdeck-card
style: pill
align: justify
tabs:
  - name: Home
    icon: mdi:home
    card:
      type: entities
      entities: [binary_sensor.front_door, binary_sensor.garage_door, lock.front_door]
  - name: Garage
    icon: "{{ 'mdi:garage-open' if is_state('binary_sensor.garage_door', 'on') else 'mdi:garage' }}"
    color: "{{ 'red' if is_state('binary_sensor.garage_door', 'on') else '' }}"
    alert:
      - condition: state
        entity: binary_sensor.garage_door
        state: "on"
    card:
      type: entities
      entities: [binary_sensor.garage_door]
  - name: Mail
    icon: mdi:email
    badge: sensor.unread_mail
    badge_color: "#e91e63"
    card: { type: markdown, content: "Three letters waiting." }
`,
  },
  {
    id: "phone",
    title: "Phone: icons + swipe",
    yaml: `type: custom:tabdeck-card
preset: ios
tab_display: active
swipe: true
swipe_mouse: true
transition: slide
tabs:
  - name: Kitchen
    subtitle: 2 lights
    icon: mdi:fridge
    card: { type: tile, entity: light.kitchen }
  - name: Living room
    icon: mdi:sofa
    card: { type: tile, entity: light.living_room }
  - name: Bedroom
    icon: mdi:bed
    card: { type: tile, entity: light.bedroom }
  - name: Outside
    icon: mdi:tree
    card: { type: weather-forecast, entity: weather.home }
`,
  },
  {
    id: "groups",
    title: "Menus, search & arrange",
    yaml: `type: custom:tabdeck-card
style: pill
search: true
hotkeys: true
customize: true
tabs:
  - name: Home
    icon: mdi:home
    card: { type: weather-forecast, entity: weather.home }
  - name: Rooms
    icon: mdi:floor-plan
    children_display: menu
    children:
      - { name: Kitchen, icon: mdi:fridge, card: { type: tile, entity: light.kitchen } }
      - { name: Living room, icon: mdi:sofa, card: { type: tile, entity: light.living_room } }
      - { name: Bedroom, icon: mdi:bed, card: { type: tile, entity: light.bedroom } }
  - name: Climate
    icon: mdi:thermostat
    children:
      - { name: Hall, card: { type: thermostat, entity: climate.hall } }
      - { name: Loft, card: { type: thermostat, entity: climate.loft } }
  - name: Media
    icon: mdi:television
    card: { type: media-control, entity: media_player.lounge_tv }
`,
  },
  {
    id: "slides",
    title: "Dots & arrows",
    yaml: `type: custom:tabdeck-card
tab_display: dots
content_arrows: true
swipe: true
swipe_mouse: true
swipe_wrap: true
tabs:
  - { name: Weather, card: { type: weather-forecast, entity: weather.home } }
  - { name: Power, card: { type: sensor, entity: sensor.power } }
  - { name: People, card: { type: entities, entities: [person.alex, person.sam] } }
`,
  },
  {
    id: "rail",
    title: "Side rail",
    yaml: `type: custom:tabdeck-card
preset: rail
rail_expand: true
header: true
tabs:
  - name: Energy
    subtitle: Live usage
    icon: mdi:lightning-bolt
    card: { type: sensor, entity: sensor.power }
  - name: Temperature
    subtitle: Inside & out
    icon: mdi:thermometer
    cards:
      - { type: sensor, entity: sensor.living_room_temperature }
      - { type: sensor, entity: sensor.outdoor_temperature }
  - name: People
    icon: mdi:account-multiple
    card:
      type: entities
      entities: [person.alex, person.sam]
`,
  },
  {
    id: "panel",
    title: "Wall panel",
    yaml: `type: custom:tabdeck-card
preset: material
auto_rotate: 6
tabs:
  - name: Weather
    icon: mdi:weather-partly-cloudy
    card: { type: weather-forecast, entity: weather.home }
  - name: Heating
    icon: mdi:radiator
    card: { type: thermostat, entity: climate.hall }
  - name: Cameras
    icon: mdi:cctv
    card: { type: picture-entity, entity: camera.driveway }
  - name: Calendar
    icon: mdi:calendar
    tap_action:
      action: navigate
      navigation_path: "#calendar"
`,
  },
];
