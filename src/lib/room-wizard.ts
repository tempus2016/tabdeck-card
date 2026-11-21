// Room wizard (editor): one tab per Home Assistant area, listing the area's
// entities, from the area / device / entity registries. Static tabs: unlike
// auto_tabs source: areas, they can be edited one by one afterwards.

export interface Room {
  id: string;
  name: string;
  icon?: string;
  entities: string[];
}

export interface Registries {
  areas: any[];
  devices: any[];
  entities: any[];
}

// The registries from the frontend's hass (hass.areas / devices / entities),
// or over WebSocket on frontends without them.
export async function loadRegistries(hass: any): Promise<Registries> {
  if (hass?.areas && hass?.entities) {
    return {
      areas: Object.values(hass.areas),
      devices: Object.values(hass.devices ?? {}),
      entities: Object.values(hass.entities),
    };
  }
  const ws = (type: string) => hass.callWS({ type }).catch(() => []);
  const [areas, devices, entities] = await Promise.all([
    ws("config/area_registry/list"),
    ws("config/device_registry/list"),
    ws("config/entity_registry/list"),
  ]);
  return { areas: areas ?? [], devices: devices ?? [], entities: entities ?? [] };
}

// Every area with the entities in it (the entity's own area, else its
// device's), skipping hidden, disabled and config/diagnostic entities and
// ones without a state. Sorted by name.
export function roomList(reg: Registries, states: Record<string, any> = {}): Room[] {
  const deviceArea = new Map<string, string>();
  for (const d of reg.devices) if (d?.id && d.area_id) deviceArea.set(d.id, d.area_id);
  const byArea = new Map<string, string[]>();
  for (const e of reg.entities) {
    if (!e?.entity_id || e.hidden || e.hidden_by || e.disabled_by || e.entity_category) continue;
    if (!(e.entity_id in states)) continue;
    const area = e.area_id ?? (e.device_id ? deviceArea.get(e.device_id) : undefined);
    if (!area) continue;
    const list = byArea.get(area) ?? [];
    list.push(e.entity_id);
    byArea.set(area, list);
  }
  return reg.areas
    .filter((a) => a?.area_id)
    .map((a) => ({
      id: String(a.area_id),
      name: String(a.name ?? a.area_id),
      icon: a.icon || undefined,
      entities: (byArea.get(a.area_id) ?? []).sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// A tab for each room: the area's icon (else a generic room icon), `area`
// set (follow_room, badges), and an entities card of its entities.
export function roomTabs(rooms: Room[]): any[] {
  return rooms.map((r) => ({
    name: r.name,
    icon: r.icon ?? "mdi:texture-box",
    area: r.id,
    card: { type: "entities", title: r.name, entities: r.entities },
  }));
}
