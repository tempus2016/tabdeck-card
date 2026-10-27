// One-click starter decks for the editor, built from the user's own entities.
// Each returns plain (un-normalised) config fragments: tabs, optional
// auto_tabs, and a few top-level options that suit the deck.

export type StarterKind = "rooms" | "lights" | "security" | "media" | "climate" | "energy" | "family";
export const STARTERS: StarterKind[] = ["rooms", "lights", "security", "media", "climate", "energy", "family"];

export interface StarterResult {
  tabs: any[];
  auto_tabs?: any;
  options?: Record<string, any>;
  // How many entities / areas the deck was built from (0 = nothing matched).
  count: number;
}

import { localize } from "./i18n";

type T = (key: string) => string;
const EN: T = (key) => localize("en", key);

// Keep generated decks a sensible size.
const MAX_TABS = 12;

const entitiesOf = (hass: any, domain: string): string[] =>
  Object.keys(hass?.states ?? {})
    .filter((id) => id.startsWith(`${domain}.`))
    .sort();

const nameOf = (hass: any, id: string): string =>
  hass?.states?.[id]?.attributes?.friendly_name ?? id.split(".")[1].replace(/_/g, " ");

const attr = (hass: any, id: string, key: string): any => hass?.states?.[id]?.attributes?.[key];

const OPENINGS = ["door", "window", "garage_door", "opening"];

function security(hass: any, t: T): StarterResult {
  const cameras = entitiesOf(hass, "camera");
  const alarms = entitiesOf(hass, "alarm_control_panel");
  const locks = entitiesOf(hass, "lock");
  const openings = entitiesOf(hass, "binary_sensor").filter((id) =>
    OPENINGS.includes(attr(hass, id, "device_class")),
  );
  const tabs: any[] = [];
  if (alarms.length) {
    tabs.push({
      name: t("starter.tab.alarm"),
      icon: "mdi:shield-home",
      cards: alarms.map((entity) => ({ type: "alarm-panel", entity })),
      alert: [{ condition: "state", entity: alarms[0], state: "triggered" }],
    });
  }
  if (cameras.length) {
    tabs.push({
      name: t("starter.tab.cameras"),
      icon: "mdi:cctv",
      columns: cameras.length > 1 ? 2 : undefined,
      cards: cameras.slice(0, MAX_TABS).map((entity) => ({ type: "picture-entity", entity, show_state: false })),
    });
  }
  if (openings.length) {
    tabs.push({
      name: t("starter.tab.openings"),
      icon: "mdi:door-open",
      badge: `{{ ${JSON.stringify(openings).replace(/"/g, "'")} | select('is_state', 'on') | list | count }}`,
      card: { type: "entities", entities: openings },
    });
  }
  if (locks.length) {
    tabs.push({
      name: t("starter.tab.locks"),
      icon: "mdi:lock",
      cards: locks.map((entity) => ({ type: "tile", entity })),
    });
  }
  return {
    tabs,
    options: { hide_inactive_badge: true },
    count: cameras.length + alarms.length + locks.length + openings.length,
  };
}

function media(hass: any): StarterResult {
  const players = entitiesOf(hass, "media_player");
  const tabs = players.slice(0, MAX_TABS).map((entity) => ({
    name: nameOf(hass, entity),
    icon: attr(hass, entity, "device_class") === "tv" ? "mdi:television" : "mdi:speaker",
    subtitle: `{{ states('${entity}') }}`,
    card: { type: "media-control", entity },
  }));
  return { tabs, options: { tab_display: "active", scrollable: true }, count: players.length };
}

function climate(hass: any): StarterResult {
  const thermostats = entitiesOf(hass, "climate");
  const tabs = thermostats.slice(0, MAX_TABS).map((entity) => ({
    name: nameOf(hass, entity),
    icon: "mdi:thermostat",
    badge: `{{ state_attr('${entity}', 'current_temperature') }}`,
    badge_format: { precision: 1, unit: "°" },
    card: { type: "thermostat", entity },
  }));
  return { tabs, count: thermostats.length };
}

function family(hass: any): StarterResult {
  const people = entitiesOf(hass, "person");
  const tabs = people.slice(0, MAX_TABS).map((entity) => ({
    name: nameOf(hass, entity),
    icon: "mdi:account",
    subtitle: `{{ states('${entity}') | replace('_', ' ') }}`,
    cards: [
      { type: "tile", entity },
      { type: "map", entities: [entity], hours_to_show: 12 },
    ],
  }));
  return { tabs, count: people.length };
}

function energy(t: T): StarterResult {
  return {
    tabs: [
      { name: t("starter.tab.energy_now"), icon: "mdi:lightning-bolt", card: { type: "energy-distribution", link_dashboard: true } },
      { name: t("starter.tab.energy_usage"), icon: "mdi:chart-bar", card: { type: "energy-usage-graph" } },
      { name: t("starter.tab.energy_sources"), icon: "mdi:table", card: { type: "energy-sources-table" } },
      { name: t("starter.tab.energy_devices"), icon: "mdi:devices", card: { type: "energy-devices-graph" } },
    ],
    // The energy cards share a period selector; it's the natural header.
    options: { lazy: true },
    count: 1,
  };
}

function areaCount(hass: any): number {
  return Object.keys(hass?.areas ?? {}).length;
}

export function buildStarter(kind: StarterKind, hass: any, t: T = EN): StarterResult {
  switch (kind) {
    case "rooms":
      return {
        tabs: [],
        auto_tabs: { source: "areas" },
        options: { scrollable: true, overflow_menu: true },
        count: areaCount(hass),
      };
    case "lights":
      return {
        tabs: [],
        auto_tabs: { source: "areas", domains: ["light"] },
        options: { scrollable: true },
        count: entitiesOf(hass, "light").length,
      };
    case "security":
      return security(hass, t);
    case "media":
      return media(hass);
    case "climate":
      return climate(hass);
    case "energy":
      return energy(t);
    case "family":
      return family(hass);
  }
}

// Merge a starter into an existing raw config: replace the tabs, or append.
export function applyStarter(cfg: any, starter: StarterResult, mode: "replace" | "append"): any {
  const tabs = mode === "replace" ? starter.tabs : [...(cfg.tabs ?? []), ...starter.tabs];
  const out: any = { ...cfg, ...(starter.options ?? {}), tabs };
  if (starter.auto_tabs) out.auto_tabs = starter.auto_tabs;
  else if (mode === "replace") delete out.auto_tabs;
  return out;
}
