// Built-in auto_tabs sources: one tab per Home Assistant area, floor, label,
// domain, device, to-do list, calendar, camera or zone, without writing Jinja;
// also TaskMate children and Z2M Device Tracker issues.
// Membership comes from HA's own template functions (so device-inherited
// areas work exactly as in HA); area and floor icons are filled in
// client-side from hass.areas / hass.floors, since Jinja has no area_icon().

export type AutoTabsSource =
  | "areas"
  | "labels"
  | "floors"
  | "domains"
  | "devices"
  | "todo"
  | "calendars"
  | "cameras"
  | "zones"
  | "updates"
  | "repairs"
  | "notifications"
  | "taskmate"
  | "z2m_tracker";
export const SOURCES: AutoTabsSource[] = [
  "areas",
  "labels",
  "floors",
  "domains",
  "devices",
  "todo",
  "calendars",
  "cameras",
  "zones",
  "updates",
  "repairs",
  "notifications",
  "taskmate",
  "z2m_tracker",
];

// Sources the card fetches itself over the websocket (Jinja can't see them).
export const CLIENT_SOURCES: AutoTabsSource[] = ["repairs", "notifications"];

// Sources whose tabs can hold auto-generated tiles (content: tiles).
const TILE_KEYS: Partial<Record<AutoTabsSource, "area" | "floor" | "label">> = {
  areas: "area",
  floors: "floor",
  labels: "label",
};

export interface SourceOptions {
  source: AutoTabsSource;
  // Only include entities of these domains (e.g. [light, switch]); for the
  // domains source, the domains to make tabs for.
  domains?: string[];
  // Ids to leave out (area / floor / label / device ids, domains, or entity
  // ids for the per-entity sources).
  exclude?: string[];
  // "tiles": area / floor / label tabs get a tile grid of their entities.
  content?: "entities" | "tiles";
}

// Default per-item blueprint: an entities card listing the item's entities.
export const SOURCE_TAB_TEMPLATE = {
  name: "{{ item.name }}",
  icon: "{{ item.icon }}",
  card: { type: "entities", entities: "{{ item.entities }}" },
};

const DEFAULTS = new WeakSet<object>([SOURCE_TAB_TEMPLATE]);
const mark = <T extends object>(t: T): T => {
  DEFAULTS.add(t);
  return t;
};

const PER_SOURCE: Partial<Record<AutoTabsSource, Record<string, any>>> = {
  todo: mark({
    name: "{{ item.name }}",
    icon: "mdi:clipboard-list-outline",
    badge: "{{ item.id }}",
    card: { type: "todo-list", entity: "{{ item.id }}" },
  }),
  calendars: mark({
    name: "{{ item.name }}",
    icon: "mdi:calendar",
    card: { type: "calendar", entities: ["{{ item.id }}"], initial_view: "listWeek" },
  }),
  cameras: mark({
    name: "{{ item.name }}",
    icon: "mdi:cctv",
    card: { type: "picture-entity", entity: "{{ item.id }}", camera_view: "auto", show_state: false },
  }),
  updates: mark({
    name: "{{ item.name }}",
    icon: "{{ item.icon }}",
    badge: "{{ item.version }}",
    card: { type: "entities", entities: ["{{ item.id }}"] },
  }),
  repairs: mark({
    name: "{{ item.name }}",
    icon: "{{ item.icon }}",
    card: {
      type: "vertical-stack",
      cards: [
        { type: "markdown", content: "{{ item.description }}" },
        {
          type: "entities",
          entities: [
            {
              type: "button",
              icon: "mdi:tools",
              name: "{{ item.open }}",
              action_name: "{{ item.open }}",
              tap_action: { action: "navigate", navigation_path: "/config/repairs" },
            },
          ],
        },
      ],
    },
  }),
  notifications: mark({
    name: "{{ item.name }}",
    icon: "mdi:bell-outline",
    card: {
      type: "vertical-stack",
      cards: [
        { type: "markdown", content: "{{ item.message }}" },
        {
          type: "entities",
          entities: [
            {
              type: "button",
              icon: "mdi:bell-check-outline",
              name: "{{ item.dismiss }}",
              action_name: "{{ item.dismiss }}",
              tap_action: {
                action: "perform-action",
                perform_action: "persistent_notification.dismiss",
                data: { notification_id: "{{ item.id }}" },
              },
            },
          ],
        },
      ],
    },
  }),
  // TaskMate: a tab per child; the badge counts today's chores left. The
  // card is built in the template (TaskMate's child card, or the child's
  // sensors when there's no overview sensor).
  taskmate: mark({
    name: "{{ item.name }}",
    icon: "{{ item.icon }}",
    badge: "{{ item.left }}",
    card: "{{ item.card }}",
  }),
  // Z2M Device Tracker: a tab per kind of issue (offline, low battery…)
  // listing the devices.
  z2m_tracker: mark({
    name: "{{ item.name }}",
    icon: "{{ item.icon }}",
    badge: "{{ item.count }}",
    card: { type: "markdown", content: "{{ item.text }}" },
  }),
  zones: mark({
    name: "{{ item.name }}",
    icon: "{{ item.icon }}",
    badge: "{{ item.count }}",
    card: { type: "map", entities: "{{ item.entities }}" },
  }),
};

// The blueprint a source uses when no tab_template is given.
export function defaultTabTemplate(opts: Pick<SourceOptions, "source" | "content" | "domains">): Record<string, any> {
  const tileKey = TILE_KEYS[opts.source];
  if (opts.content === "tiles" && tileKey) {
    return mark({
      name: "{{ item.name }}",
      icon: "{{ item.icon }}",
      [tileKey]: "{{ item.id }}",
      ...(opts.domains?.length ? { domains: opts.domains } : {}),
    });
  }
  return PER_SOURCE[opts.source] ?? SOURCE_TAB_TEMPLATE;
}

// True for a blueprint this module made (so the editor can leave it out of
// the YAML; it's regenerated from `source`).
export function isDefaultTabTemplate(t: unknown): boolean {
  return !!t && typeof t === "object" && DEFAULTS.has(t as object);
}

// Domains tabbed by `source: domains` when none are given, with their icons.
const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  climate: "mdi:thermostat",
  cover: "mdi:window-shutter",
  fan: "mdi:fan",
  media_player: "mdi:television",
  lock: "mdi:lock",
  camera: "mdi:cctv",
  vacuum: "mdi:robot-vacuum",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-blank-circle-outline",
  person: "mdi:account",
  scene: "mdi:palette",
  script: "mdi:script-text",
  automation: "mdi:robot",
};
// Z2M Device Tracker issue kinds (English names) and their icons.
const Z2M_ICONS: Record<string, string> = {
  offline: "mdi:lan-disconnect",
  "low battery": "mdi:battery-alert-variant-outline",
  "weak signal": "mdi:signal-cellular-1",
  "chatty device": "mdi:message-flash-outline",
  "frozen reading": "mdi:snowflake-alert",
  unidentified: "mdi:help-circle-outline",
  "coordinator backup": "mdi:content-save-alert-outline",
};
const COMMON_DOMAINS = ["light", "switch", "climate", "cover", "fan", "media_player", "lock", "camera", "vacuum"];

const SAFE_ID = /^[a-z0-9_]+$/;
const SAFE_ID_OR_ENTITY = /^[a-z0-9_]+(\.[a-z0-9_]+)?$/;

function jinjaList(ids: string[]): string {
  return "[" + ids.map((i) => `'${i}'`).join(", ") + "]";
}

function jinjaDict(map: Record<string, string>): string {
  return "{" + Object.entries(map).map(([k, v]) => `'${k}': '${v}'`).join(", ") + "}";
}

const OUT = ["{%- set ns = namespace(out=[]) -%}"];
const END = ["{{ ns.out | tojson }}"];

export function buildSourceTemplate(opts: SourceOptions): string {
  const domains = (opts.domains ?? []).map(String).filter((d) => SAFE_ID.test(d));
  const exclude = jinjaList((opts.exclude ?? []).map(String).filter((d) => SAFE_ID_OR_ENTITY.test(d)));
  const filter = domains.length ? ` | select('match', '^(${domains.join("|")})\\\\.')` : "";
  const add = (fields: string) => `{%- set ns.out = ns.out + [{${fields}}] -%}`;
  const ifAny = (fields: string) => ["{%- if ents | count > 0 -%}", add(fields), "{%- endif -%}"];

  switch (opts.source) {
    case "areas":
    case "labels": {
      const isAreas = opts.source === "areas";
      const icon = isAreas ? "mdi:texture-box" : "mdi:label-outline";
      return [
        ...OUT,
        `{%- for id in ${isAreas ? "areas()" : "labels()"} if id not in ${exclude} -%}`,
        `{%- set ents = ${isAreas ? "area_entities" : "label_entities"}(id)${filter} | list -%}`,
        ...ifAny(`'id': id, 'name': ${isAreas ? "area_name" : "label_name"}(id), 'icon': '${icon}', 'entities': ents`),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    }
    case "floors":
      return [
        ...OUT,
        `{%- for id in floors() if id not in ${exclude} -%}`,
        "{%- set acc = namespace(l=[]) -%}",
        "{%- for a in floor_areas(id) -%}{%- set acc.l = acc.l + (area_entities(a) | list) -%}{%- endfor -%}",
        `{%- set ents = acc.l${filter} | list -%}`,
        ...ifAny("'id': id, 'name': floor_name(id), 'icon': 'mdi:home-floor-1', 'entities': ents"),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    case "domains": {
      const wanted = domains.length ? domains : COMMON_DOMAINS;
      return [
        ...OUT,
        `{%- set icons = ${jinjaDict(DOMAIN_ICONS)} -%}`,
        `{%- for id in ${jinjaList(wanted)} if id not in ${exclude} -%}`,
        "{%- set ents = states[id] | map(attribute='entity_id') | list -%}",
        ...ifAny("'id': id, 'name': id | replace('_', ' ') | capitalize, 'icon': icons.get(id, 'mdi:shape'), 'entities': ents"),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    }
    case "devices":
      return [
        ...OUT,
        "{%- for id in states | map(attribute='entity_id') | map('device_id') | reject('none') | unique | list -%}",
        `{%- if id not in ${exclude} -%}`,
        `{%- set ents = device_entities(id)${filter} | list -%}`,
        ...ifAny("'id': id, 'name': device_attr(id, 'name_by_user') or device_attr(id, 'name'), 'icon': 'mdi:devices', 'entities': ents"),
        "{%- endif -%}",
        "{%- endfor -%}",
        "{{ ns.out | sort(attribute='name') | tojson }}",
      ].join("\n");
    case "todo":
    case "calendars":
    case "cameras": {
      const domain = { todo: "todo", calendars: "calendar", cameras: "camera" }[opts.source];
      return [
        ...OUT,
        `{%- for s in states.${domain} if s.entity_id not in ${exclude} -%}`,
        add("'id': s.entity_id, 'name': s.name"),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    }
    case "updates":
      return [
        ...OUT,
        `{%- for s in states.update | selectattr('state', 'eq', 'on') if s.entity_id not in ${exclude} -%}`,
        add(
          "'id': s.entity_id, 'name': s.attributes.title or s.name, 'icon': s.attributes.icon or 'mdi:package-up', 'version': s.attributes.latest_version or ''",
        ),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    case "repairs":
    case "notifications":
      // Fetched by the card (CLIENT_SOURCES); no template.
      return "";
    case "taskmate":
      // Child sensors carry child_id / child_name / total_points_earned; the
      // watch sensor has today's `left`; the overview sensor has `children`.
      return [
        "{%- set ns = namespace(out=[], seen=[]) -%}",
        "{%- set ents = expand(integration_entities('taskmate') | select('match', '^sensor\\.') | list) -%}",
        "{%- set overview = ents | selectattr('attributes.children', 'defined') | map(attribute='entity_id') | first | default('') -%}",
        "{%- set watches = ents | selectattr('attributes.left', 'defined') | selectattr('attributes.child_id', 'defined') | list -%}",
        "{%- for s in ents | selectattr('attributes.child_name', 'defined') | selectattr('attributes.total_points_earned', 'defined') -%}",
        "{%- set id = s.attributes.child_id | default('') -%}",
        `{%- if id and id not in ns.seen and id not in ${exclude} -%}`,
        "{%- set ns.seen = ns.seen + [id] -%}",
        "{%- set w = watches | selectattr('attributes.child_id', 'eq', id) | first | default(none) -%}",
        "{%- set avatar = s.attributes.avatar | default('') | string -%}",
        "{%- set card = {'type': 'custom:taskmate-child-card', 'entity': overview, 'child_id': id} if overview else {'type': 'entities', 'entities': [s.entity_id] + ([w.entity_id] if w else [])} -%}",
        add(
          "'id': id, 'name': s.attributes.child_name, 'icon': avatar if avatar.startswith('mdi:') else 'mdi:account', 'left': (w.attributes.left | string) if w and w.attributes.left else '', 'points': s.state, 'entity': overview, 'card': card",
        ),
        "{%- endif -%}",
        "{%- endfor -%}",
        "{{ ns.out | sort(attribute='name') | tojson }}",
      ].join("\n");
    case "z2m_tracker":
      // The tracker's issues sensor lists { device, issue, detail, critical }.
      return [
        "{%- set ns = namespace(out=[], kinds=[]) -%}",
        `{%- set icons = ${jinjaDict(Z2M_ICONS)} -%}`,
        "{%- set src = expand(integration_entities('z2m_tracker') | select('match', '^sensor\\.') | list) | selectattr('attributes.warnings', 'defined') | first | default(none) -%}",
        "{%- set warnings = src.attributes.warnings | list if src else [] -%}",
        "{%- for w in warnings if w.issue is defined -%}",
        "{%- if w.issue not in ns.kinds and (w.issue | lower | replace(' ', '_')) not in " + exclude + " -%}{%- set ns.kinds = ns.kinds + [w.issue] -%}{%- endif -%}",
        "{%- endfor -%}",
        "{%- for kind in ns.kinds -%}",
        "{%- set rows = warnings | selectattr('issue', 'eq', kind) | list -%}",
        "{%- set t = namespace(text='') -%}",
        "{%- for w in rows -%}{%- set t.text = t.text ~ '- **' ~ w.device ~ '**' ~ ((' · ' ~ w.detail) if w.detail else '') ~ '\\n' -%}{%- endfor -%}",
        add(
          "'id': kind | lower | replace(' ', '_'), 'name': kind, 'icon': icons.get(kind | lower, 'mdi:alert-circle-outline'), 'count': rows | count | string, 'critical': rows | selectattr('critical') | list | count > 0, 'devices': rows | map(attribute='device') | list, 'text': t.text",
        ),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
    case "zones":
      return [
        ...OUT,
        `{%- for z in states.zone if z.entity_id not in ${exclude} -%}`,
        "{%- set key = 'home' if z.entity_id == 'zone.home' else z.name -%}",
        "{%- set people = states.person | selectattr('state', 'eq', key) | map(attribute='entity_id') | list -%}",
        add(
          "'id': z.entity_id, 'name': z.name, 'icon': z.attributes.icon or 'mdi:map-marker-radius', 'entities': [z.entity_id] + people, 'count': people | count | string",
        ),
        "{%- endfor -%}",
        ...END,
      ].join("\n");
  }
}
