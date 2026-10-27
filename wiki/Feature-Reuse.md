# Reuse: tab defaults and tab templates

Stop repeating yourself across tabs.

## `tab_defaults`

Keys applied to **every** tab, including tabs made by [`auto_tabs`](Feature-Dynamic-Tabs). A tab's own keys win; `styles` maps are merged.

```yaml
type: custom:tabdeck-card
tab_defaults:
  accent: "#e91e63"
  badge_format: { precision: 0, max: 99 }
  hold_action: { action: more-info }
  styles: { --tabdeck-tab-font-size: 15px }
tabs:
  - name: Lights
    badge: { count: light.*, state: "on" }
    card: { ... }
  - name: Climate
    accent: orange            # overrides the default
    card: { ... }
```

`tab_defaults` never sets a tab's `name` or `card`.

## `tab_templates` + `use`

Name a tab blueprint once, then fill it in per tab. Inside a blueprint, `{{ item.<var> }}` is replaced from the tab's `vars` (the same placeholders as `auto_tabs`; anything else in `{{ }}` is passed to Home Assistant as a normal template):

```yaml
type: custom:tabdeck-card
tab_templates:
  room:
    icon: mdi:sofa
    badge: { count: "light.{{ item.area }}_*", state: "on" }
    card:
      type: area
      area: "{{ item.area }}"
tabs:
  - name: Kitchen
    use: room
    vars: { area: kitchen }
  - name: Lounge
    use: room
    icon: mdi:television      # the tab's own keys win over the template
    vars: { area: lounge }
```

- A placeholder that is the whole value keeps its type (`show_camera: "{{ item.camera }}"` with `camera: true` gives `true`); a missing var becomes an empty string.
- Order: `tab_defaults`, then the template, then the tab's own keys.
- An unknown template name leaves the tab as written.

## In the visual editor

Both stay in your YAML as written. The editor shows each tab's own keys and keeps `use`, `vars`, `tab_defaults` and `tab_templates` untouched when you edit other fields. Tabs filled from a template show the template's card only on the dashboard.
