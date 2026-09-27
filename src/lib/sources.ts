// Built-in auto_tabs sources: one tab per Home Assistant area or label,
// without writing Jinja. Membership comes from HA's own template functions
// (so device-inherited areas work exactly as in HA); area icons are filled in
// client-side from hass.areas, since Jinja has no area_icon().

export type AutoTabsSource = "areas" | "labels";
export const SOURCES: AutoTabsSource[] = ["areas", "labels"];

export interface SourceOptions {
  source: AutoTabsSource;
  // Only include entities of these domains (e.g. [light, switch]).
  domains?: string[];
  // Area / label ids to leave out.
  exclude?: string[];
}

// Default per-item blueprint: an entities card listing the area's entities.
export const SOURCE_TAB_TEMPLATE = {
  name: "{{ item.name }}",
  icon: "{{ item.icon }}",
  card: { type: "entities", entities: "{{ item.entities }}" },
};

const SAFE_ID = /^[a-z0-9_]+$/;

function jinjaList(ids: string[]): string {
  return "[" + ids.map((i) => `'${i}'`).join(", ") + "]";
}

export function buildSourceTemplate(opts: SourceOptions): string {
  const domains = (opts.domains ?? []).map(String).filter((d) => SAFE_ID.test(d));
  const exclude = (opts.exclude ?? []).map(String).filter((d) => SAFE_ID.test(d));
  const isAreas = opts.source === "areas";
  const list = isAreas ? "areas()" : "labels()";
  const nameFn = isAreas ? "area_name" : "label_name";
  const entsFn = isAreas ? "area_entities" : "label_entities";
  const icon = isAreas ? "mdi:texture-box" : "mdi:label-outline";
  const filter = domains.length
    ? ` | select('match', '^(${domains.join("|")})\\\\.')`
    : "";
  return [
    "{%- set ns = namespace(out=[]) -%}",
    `{%- for id in ${list} if id not in ${jinjaList(exclude)} -%}`,
    `{%- set ents = ${entsFn}(id)${filter} | list -%}`,
    "{%- if ents | count > 0 -%}",
    `{%- set ns.out = ns.out + [{'id': id, 'name': ${nameFn}(id), 'icon': '${icon}', 'entities': ents}] -%}`,
    "{%- endif -%}",
    "{%- endfor -%}",
    "{{ ns.out | tojson }}",
  ].join("\n");
}
