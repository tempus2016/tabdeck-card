// "Convert from…": turn another card's config (or a stack / view / dashboard)
// into Tabdeck tabs, so switching from another tabbed setup takes one paste.

export type ConvertSource =
  | "tabdeck"
  | "tabbed-card"
  | "swipe-card"
  | "state-switch"
  | "bubble-popups"
  | "dashboard"
  | "view"
  | "sections"
  | "stack"
  | "cards";

export interface ConvertResult {
  source: ConvertSource;
  tabs: any[];
  // Top-level Tabdeck options carried over (applied when replacing).
  options: Record<string, any>;
  // Things that couldn't be carried over exactly (translation keys).
  notes: string[];
}

const TYPE_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  thermostat: "mdi:thermostat",
  humidifier: "mdi:air-humidifier",
  "media-control": "mdi:speaker",
  "weather-forecast": "mdi:weather-partly-cloudy",
  map: "mdi:map",
  calendar: "mdi:calendar",
  "todo-list": "mdi:checkbox-marked-outline",
  "shopping-list": "mdi:cart",
  "history-graph": "mdi:chart-line",
  "statistics-graph": "mdi:chart-bar",
  sensor: "mdi:chart-line",
  gauge: "mdi:gauge",
  "alarm-panel": "mdi:shield-home",
  "picture-entity": "mdi:cctv",
  "picture-glance": "mdi:image",
  picture: "mdi:image",
  "picture-elements": "mdi:image",
  entities: "mdi:format-list-bulleted",
  glance: "mdi:view-grid",
  markdown: "mdi:text",
  iframe: "mdi:web",
  area: "mdi:texture-box",
  logbook: "mdi:format-list-text",
  "energy-distribution": "mdi:lightning-bolt",
};

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  climate: "mdi:thermostat",
  media_player: "mdi:speaker",
  camera: "mdi:cctv",
  person: "mdi:account",
  lock: "mdi:lock",
  cover: "mdi:window-shutter",
  fan: "mdi:fan",
  vacuum: "mdi:robot-vacuum",
  sensor: "mdi:eye",
  weather: "mdi:weather-partly-cloudy",
};

const isObj = (v: any): v is Record<string, any> => !!v && typeof v === "object" && !Array.isArray(v);
const typeOf = (card: any): string => String(card?.type ?? "").replace(/^custom:/, "");

// First entity a card refers to (entity / entities[0]).
function firstEntity(card: any): string | undefined {
  if (typeof card?.entity === "string") return card.entity;
  const e = Array.isArray(card?.entities) ? card.entities[0] : undefined;
  if (typeof e === "string") return e;
  if (isObj(e) && typeof e.entity === "string") return e.entity;
  return undefined;
}

function prettify(s: string): string {
  const t = s.replace(/^custom:/, "").replace(/[-_]/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// A readable tab name and icon for an arbitrary card.
export function describeCard(card: any, hass?: any, index = 0): { name: string; icon?: string } {
  const ent = firstEntity(card);
  const name =
    card?.title ??
    card?.name ??
    card?.heading ??
    (ent ? hass?.states?.[ent]?.attributes?.friendly_name ?? prettify(ent.split(".")[1] ?? ent) : undefined) ??
    (card?.type ? prettify(String(card.type)) : `Tab ${index + 1}`);
  const icon =
    (typeof card?.icon === "string" ? card.icon : undefined) ??
    TYPE_ICONS[typeOf(card)] ??
    (ent ? DOMAIN_ICONS[ent.split(".")[0]] : undefined);
  return { name: String(name), icon };
}

// HA conditional-card conditions → Tabdeck visibility conditions. The legacy
// shorthand ({entity, state}) has no `condition` key.
export function toVisibility(conditions: any): any[] | undefined {
  if (!Array.isArray(conditions) || conditions.length === 0) return undefined;
  return conditions.map((c: any) => {
    if (!isObj(c) || c.condition) return c;
    const out: any = { condition: "state", entity: c.entity };
    if (c.state !== undefined) out.state = c.state;
    if (c.state_not !== undefined) out.state_not = c.state_not;
    return out;
  });
}

// One tab from one card. A conditional card's conditions (and a card's own
// sections-style `visibility`) become the tab's visibility.
function tabFromCard(card: any, hass: any, index: number, override?: { name?: string; icon?: string }): any {
  let inner = card;
  let visibility = toVisibility(card?.visibility);
  if (typeOf(card) === "conditional" && isObj(card.card)) {
    inner = card.card;
    visibility = toVisibility(card.conditions);
  } else if (visibility) {
    const { visibility: _v, ...rest } = card;
    inner = rest;
  }
  const d = describeCard(inner, hass, index);
  const tab: any = { name: override?.name ?? d.name, card: inner };
  const icon = override?.icon ?? d.icon;
  if (icon) tab.icon = icon;
  if (visibility) tab.visibility = visibility;
  return tab;
}

const isHeading = (c: any) => typeOf(c) === "heading";
const isBubblePopup = (c: any) => typeOf(c) === "bubble-card" && c.card_type === "pop-up";

// A run of cards → one tab ("cards" when several, else "card").
function tabFromGroup(cards: any[], hass: any, index: number, name?: string, icon?: string): any | undefined {
  if (cards.length === 0) return undefined;
  if (cards.length === 1) return tabFromCard(cards[0], hass, index, name ? { name, icon } : undefined);
  const tab: any = { name: name ?? describeCard(cards[0], hass, index).name, cards };
  const ic = icon ?? describeCard(cards[0], hass, index).icon;
  if (ic) tab.icon = ic;
  return tab;
}

// Split a card list at `heading` cards: each heading starts a tab. Without
// headings, every card becomes its own tab.
function tabsFromCards(cards: any[], hass: any): any[] {
  if (!cards.some(isHeading)) return cards.map((c, i) => tabFromCard(c, hass, i));
  const tabs: any[] = [];
  let name: string | undefined;
  let icon: string | undefined;
  let run: any[] = [];
  const flush = () => {
    const t = tabFromGroup(run, hass, tabs.length, name, icon);
    if (t) tabs.push(t);
    run = [];
  };
  for (const c of cards) {
    if (isHeading(c)) {
      flush();
      name = c.heading ?? name;
      icon = c.icon;
    } else run.push(c);
  }
  flush();
  return tabs;
}

// A sections-view section: its heading card names the tab.
function tabFromSection(section: any, hass: any, index: number): any | undefined {
  const cards: any[] = Array.isArray(section?.cards) ? section.cards : [];
  const heading = cards.find(isHeading);
  const rest = cards.filter((c) => c !== heading);
  const t = tabFromGroup(rest, hass, index, heading?.heading, heading?.icon);
  if (t && Array.isArray(section.visibility)) t.visibility = toVisibility(section.visibility);
  return t;
}

function viewCards(view: any): any[] {
  if (Array.isArray(view?.sections)) {
    return view.sections.flatMap((s: any) => (Array.isArray(s?.cards) ? s.cards : []));
  }
  return Array.isArray(view?.cards) ? view.cards : [];
}

function fromTabbedCard(cfg: any, hass: any): ConvertResult {
  const notes: string[] = [];
  const tabs = (Array.isArray(cfg.tabs) ? cfg.tabs : []).map((t: any, i: number) => {
    const attrs = { ...(cfg.attributes ?? {}), ...(t?.attributes ?? {}) };
    const tab: any = tabFromCard(t?.card ?? {}, hass, i);
    if (attrs.label) tab.name = String(attrs.label);
    if (attrs.icon) tab.icon = attrs.icon;
    if (isObj(t?.styles) && Object.keys(t.styles).length) notes.push("convert.note.tab_styles");
    return tab;
  });
  const options: Record<string, any> = {};
  const idx = Number(cfg.options?.defaultTabIndex);
  if (Number.isInteger(idx) && idx >= 0) options.default_tab = idx;
  const primary = cfg.styles?.["--mdc-theme-primary"];
  if (primary) options.styles = { "--tabdeck-accent": primary };
  if (isObj(cfg.styles) && Object.keys(cfg.styles).some((k) => k !== "--mdc-theme-primary")) {
    notes.push("convert.note.styles");
  }
  return { source: "tabbed-card", tabs, options, notes: [...new Set(notes)] };
}

function fromSwipeCard(cfg: any, hass: any): ConvertResult {
  const cards = Array.isArray(cfg.cards) ? cfg.cards : [];
  const options: Record<string, any> = { swipe: true, swipe_mouse: true };
  const start = Number(cfg.start_card);
  if (Number.isInteger(start) && start > 1) options.default_tab = start - 1;
  if (cfg.parameters?.loop) options.swipe_wrap = true;
  const notes = cfg.parameters?.autoplay ? ["convert.note.autoplay"] : [];
  if (cfg.parameters?.autoplay) {
    const delay = Number(cfg.parameters.autoplay?.delay);
    options.auto_rotate = Number.isFinite(delay) && delay > 0 ? Math.max(2, Math.round(delay / 1000)) : 5;
  }
  return { source: "swipe-card", tabs: cards.map((c: any, i: number) => tabFromCard(c, hass, i)), options, notes };
}

function fromStateSwitch(cfg: any, hass: any): ConvertResult {
  const states = isObj(cfg.states) ? cfg.states : {};
  const entity = String(cfg.entity ?? "");
  const options: Record<string, any> = {};
  const notes: string[] = [];
  const realEntity = entity.includes(".");
  const tabs = Object.entries(states).map(([state, card], i) => {
    const tab: any = tabFromCard(card, hass, i, { name: state, icon: describeCard(card, hass, i).icon });
    if (realEntity) tab.auto_select = { entity, state };
    return tab;
  });
  if (entity === "hash") options.remember = "url";
  else if (!realEntity) notes.push("convert.note.state_switch_mode");
  if (cfg.default !== undefined && states[cfg.default] !== undefined) options.default_tab = String(cfg.default);
  if (realEntity) {
    // Start on the tab matching the entity's current state.
    const cur = hass?.states?.[entity]?.state;
    if (cur !== undefined && states[cur] !== undefined) options.default_tab = cur;
  }
  if (cfg.transition === "slide-left" || cfg.transition === "slide-right") options.transition = "slide";
  else if (cfg.transition === "fade" || cfg.transition === "flip") options.transition = "fade";
  return { source: "state-switch", tabs, options, notes };
}

// Bubble Card pop-ups: a stack whose first card is a pop-up becomes a tab.
function bubbleTab(stack: any, hass: any, index: number): any | undefined {
  const cards: any[] = Array.isArray(stack?.cards) ? stack.cards : [];
  const pop = cards[0];
  if (!isBubblePopup(pop)) return undefined;
  const rest = cards.slice(1);
  const name = pop.name ?? (typeof pop.hash === "string" ? prettify(pop.hash.replace(/^#/, "")) : undefined);
  return tabFromGroup(rest, hass, index, name, pop.icon) ?? { name, icon: pop.icon, card: { type: "markdown", content: " " } };
}

function hasBubblePopups(cards: any[]): boolean {
  return cards.some((c) => Array.isArray(c?.cards) && isBubblePopup(c.cards[0]));
}

function fromCardList(cards: any[], hass: any, source: ConvertSource): ConvertResult {
  if (hasBubblePopups(cards)) {
    const notes = ["convert.note.bubble"];
    const tabs = cards
      .map((c, i) => bubbleTab(c, hass, i))
      .filter((t): t is any => !!t);
    return { source: "bubble-popups", tabs, options: {}, notes };
  }
  return { source, tabs: tabsFromCards(cards, hass), options: {}, notes: [] };
}

// Detect what was pasted and convert it. Throws on input that isn't a card,
// a list of cards, a view or a dashboard.
export function convertConfig(input: any, hass?: any): ConvertResult {
  if (Array.isArray(input)) {
    if (input.length === 0) throw new Error("convert.error.empty");
    // A list of tabdeck tabs pasted on its own.
    if (input.every((t) => isObj(t) && (t.card || t.cards) && !t.type)) {
      return { source: "tabdeck", tabs: input, options: {}, notes: [] };
    }
    return fromCardList(input, hass, "cards");
  }
  if (!isObj(input)) throw new Error("convert.error.not_card");
  if (Array.isArray(input.views)) {
    const tabs = input.views.map((v: any, i: number) => {
      const cards = viewCards(v);
      const name = v.title ?? v.path ?? `View ${i + 1}`;
      return tabFromGroup(cards, hass, i, String(name), v.icon) ?? { name: String(name), icon: v.icon, card: { type: "markdown", content: " " } };
    });
    return { source: "dashboard", tabs, options: {}, notes: ["convert.note.dashboard"] };
  }
  if (Array.isArray(input.sections)) {
    const tabs = input.sections
      .map((s: any, i: number) => tabFromSection(s, hass, i))
      .filter((t: any) => !!t);
    return { source: "sections", tabs, options: {}, notes: [] };
  }
  const type = typeOf(input);
  if (type === "tabdeck-card") {
    const { type: _t, tabs, ...options } = input;
    return { source: "tabdeck", tabs: Array.isArray(tabs) ? tabs : [], options, notes: [] };
  }
  if (type === "tabbed-card") return fromTabbedCard(input, hass);
  if (type === "swipe-card") return fromSwipeCard(input, hass);
  if (type === "state-switch") return fromStateSwitch(input, hass);
  if (!input.type && Array.isArray(input.cards)) {
    return { ...fromCardList(input.cards, hass, "view"), notes: [] };
  }
  if (Array.isArray(input.cards)) {
    // vertical-stack / horizontal-stack / grid / any card with child cards.
    return fromCardList(input.cards, hass, "stack");
  }
  if (input.type) {
    return { source: "cards", tabs: [tabFromCard(input, hass, 0)], options: {}, notes: [] };
  }
  throw new Error("convert.error.not_card");
}

// Merge a conversion into the current raw config.
export function applyConversion(cfg: any, result: ConvertResult, mode: "replace" | "append"): any {
  if (mode === "append") return { ...cfg, tabs: [...(cfg.tabs ?? []), ...result.tabs] };
  const out: any = { ...cfg, ...result.options, tabs: result.tabs };
  if (!result.options.auto_tabs) delete out.auto_tabs;
  return out;
}
