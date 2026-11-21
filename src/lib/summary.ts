// Plain-language summary of a deck for the visual editor: a list of sentences
// (translation keys under summary.* with their values). Lists of tab names
// come as `names` for the editor to join in the reader's language.
import { isTemplate } from "./templates";
import { isActionTab } from "./config";

export interface SummaryLine {
  key: string;
  vars?: Record<string, string | number>;
  // Tab names to join into vars.names (Intl.ListFormat in the editor).
  names?: string[];
  // A count for plural forms (vars.n).
  n?: number;
}

const isObj = (v: any): v is Record<string, any> => !!v && typeof v === "object" && !Array.isArray(v);
const shown = (t: any, i: number) => (typeof t?.name === "string" && t.name && !isTemplate(t.name) ? t.name : `#${i + 1}`);
const MAX_NAMES = 6;
const clip = (names: string[]) => (names.length > MAX_NAMES ? [...names.slice(0, MAX_NAMES - 1), "…"] : names);

export function summarizeConfig(cfg: any): SummaryLine[] {
  if (!isObj(cfg)) return [];
  const tabs: any[] = Array.isArray(cfg.tabs) ? cfg.tabs.filter(isObj) : [];
  const out: SummaryLine[] = [];
  const defaults = isObj(cfg.tab_defaults) ? cfg.tab_defaults : {};
  const tabHas = (t: any, key: string) => {
    const v = t[key] ?? defaults[key];
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== "" && v !== false;
  };
  const named = (pred: (t: any) => boolean) => tabs.map((t, i) => (pred(t) ? shown(t, i) : "")).filter(Boolean);
  // A sentence about some tabs: n picks "needs" / "need".
  const about = (key: string, names: string[]) => out.push({ key, names: clip(names), n: names.length });

  // What's in it.
  out.push({ key: "summary.tabs", n: tabs.length, names: clip(tabs.map(shown)) });
  if (cfg.auto_tabs) {
    const source = cfg.auto_tabs.source;
    out.push(source ? { key: "summary.auto_source", vars: { source: String(source) } } : { key: "summary.auto_template" });
  }

  // Where it starts.
  const d = cfg.default_tab;
  const start =
    typeof d === "number" ? tabs[d] : tabs.find((t, i) => t.name === d || String(i) === String(d));
  if (start && tabs.indexOf(start) > 0) out.push({ key: "summary.opens_on", vars: { tab: shown(start, tabs.indexOf(start)) } });
  const conditional = named((t) => tabHas(t, "default_if"));
  if (conditional.length) about("summary.default_if", conditional);
  if (cfg.remember === "browser") out.push({ key: "summary.remember_browser" });
  else if (cfg.remember === "url") out.push({ key: "summary.remember_url" });
  else if (cfg.remember === "entity" && cfg.remember_entity) {
    out.push({ key: "summary.remember_entity", vars: { entity: cfg.remember_entity } });
  }

  // What the tabs do.
  const sometimes = named((t) => tabHas(t, "visibility"));
  if (sometimes.length) about("summary.visibility", sometimes);
  const alerts = named((t) => tabHas(t, "alert"));
  if (alerts.length) about("summary.alerts", alerts);
  const badges = named((t) => tabHas(t, "badge") || tabHas(t, "badge_icon") || tabHas(t, "ring"));
  if (badges.length) about("summary.badges", badges);
  const locked = named((t) => tabHas(t, "pin"));
  if (locked.length) about("summary.pin", locked);
  const actions = named((t) => isActionTab(t));
  if (actions.length) about("summary.actions", actions);

  // How you move around.
  if (cfg.swipe && cfg.swipe_mouse) out.push({ key: "summary.swipe_mouse" });
  else if (cfg.swipe) out.push({ key: "summary.swipe" });
  if (cfg.auto_rotate?.interval) out.push({ key: "summary.rotate", n: cfg.auto_rotate.interval });
  if (cfg.idle_return) {
    const home = start ?? tabs[0];
    out.push({ key: "summary.idle_return", n: cfg.idle_return, vars: { tab: home ? shown(home, tabs.indexOf(home)) : "#1" } });
  }

  // Things that switch it for you.
  if (cfg.remote_entity) out.push({ key: "summary.remote_entity", vars: { entity: cfg.remote_entity } });
  if (cfg.remote_event) out.push({ key: "summary.remote_event" });
  if (cfg.follow_room?.entity) out.push({ key: "summary.follow_room", vars: { entity: cfg.follow_room.entity } });
  for (const t of Array.isArray(cfg.takeover) ? cfg.takeover : []) {
    if (t?.entity && t?.tab) out.push({ key: "summary.takeover", vars: { tab: String(t.tab), entity: t.entity }, n: t.duration ?? 30 });
  }
  if (cfg.quiet_hours) {
    const q = cfg.quiet_hours;
    if (q.from && q.to) out.push({ key: "summary.quiet_time", vars: { from: q.from, to: q.to } });
    else if (q.entity) out.push({ key: "summary.quiet_entity", vars: { entity: q.entity } });
  }
  if (cfg.lazy) out.push({ key: "summary.lazy" });
  return out;
}
