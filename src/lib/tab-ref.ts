// tab_ref: a tab defined once on another dashboard's Tabdeck card and reused
// here: `tab_ref: family/weather` (dashboard / tab) or
// `family/home/weather` (dashboard / view / tab). The other dashboard is read
// with lovelace/config (read only, cached per page load, shared with view:
// tabs). Keys written next to tab_ref override the shared tab's.
import { expandTab } from "./config";
import { findView } from "./view-source";

export interface TabRef {
  dashboard: string;
  view?: string;
  tab: string;
}

export type TabRefError = "bad_ref" | "missing_dashboard" | "missing_tab" | "loop";

export interface ResolvedRef {
  tab?: Record<string, any>;
  error?: TabRefError;
}

const MAX_DEPTH = 5;

// Strips a character from both ends without a regex (a /^x+|x+$/ pattern
// backtracks badly on long runs of x).
function trimChar(text: string, ch: string): string {
  let a = 0;
  let b = text.length;
  while (a < b && text[a] === ch) a++;
  while (b > a && text[b - 1] === ch) b--;
  return text.slice(a, b);
}

export function parseTabRef(raw: unknown): TabRef | undefined {
  if (typeof raw !== "string") return undefined;
  const parts = trimChar(raw.trim(), "/")
    .split("/")
    .map((p) => p.trim());
  if (parts.length < 2 || parts.length > 3 || parts.some((p) => !p)) return undefined;
  return parts.length === 2 ? { dashboard: parts[0], tab: parts[1] } : { dashboard: parts[0], view: parts[1], tab: parts[2] };
}

export function hasTabRefs(raw: any): boolean {
  return Array.isArray(raw?.tabs) && raw.tabs.some((t: any) => t && typeof t === "object" && t.tab_ref !== undefined);
}

const slug = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

interface Found {
  tab: Record<string, any>;
  deck: Record<string, any>;
}

// Every Tabdeck card config inside a view (stacks, sections, conditional
// cards, other decks' tabs), in document order.
function decksIn(node: any, out: Record<string, any>[], depth = 0): void {
  if (!node || typeof node !== "object" || depth > 30) return;
  if (Array.isArray(node)) {
    for (const n of node) decksIn(n, out, depth + 1);
    return;
  }
  if (node.type === "custom:tabdeck-card" && Array.isArray(node.tabs)) out.push(node);
  for (const v of Object.values(node)) if (v && typeof v === "object") decksIn(v, out, depth + 1);
}

function tabsOf(tabs: any[], out: any[]): void {
  for (const t of tabs) {
    if (!t || typeof t !== "object") continue;
    out.push(t);
    if (Array.isArray(t.children)) tabsOf(t.children, out);
  }
}

// The shared tab in a dashboard config: exact name, then any case, then slug.
export function findRefTab(config: any, ref: TabRef): Found | undefined {
  const views: any[] = ref.view !== undefined ? [findView(config, ref.view)].filter(Boolean) : Array.isArray(config?.views) ? config.views : [];
  const candidates: Found[] = [];
  for (const view of views) {
    const decks: Record<string, any>[] = [];
    decksIn(view, decks);
    for (const deck of decks) {
      const tabs: any[] = [];
      tabsOf(deck.tabs, tabs);
      for (const tab of tabs) candidates.push({ tab, deck });
    }
  }
  const name = (c: Found) => (typeof c.tab.name === "string" ? c.tab.name : "");
  return (
    candidates.find((c) => name(c) === ref.tab) ??
    candidates.find((c) => name(c).toLowerCase() === ref.tab.toLowerCase()) ??
    candidates.find((c) => name(c) && slug(name(c)) === slug(ref.tab))
  );
}

// tab_ref values anywhere inside a tab's content (nested decks).
function nestedRefs(node: any, out: string[], depth = 0): void {
  if (!node || typeof node !== "object" || depth > 30) return;
  if (Array.isArray(node)) {
    for (const n of node) nestedRefs(n, out, depth + 1);
    return;
  }
  if (typeof node.tab_ref === "string" && depth > 0) out.push(node.tab_ref);
  for (const v of Object.values(node)) if (v && typeof v === "object") nestedRefs(v, out, depth + 1);
}

const keyOf = (r: TabRef) => `${r.dashboard}/${r.view ?? "*"}/${slug(r.tab)}`.toLowerCase();

// Follow one tab_ref (and any tab_ref the shared tab has itself) to a plain
// tab. `chain` holds the refs already being followed, so A → B → A stops.
export async function resolveTabRef(
  raw: string,
  load: (dashboard: string) => Promise<any>,
  chain: string[] = [],
): Promise<ResolvedRef> {
  const ref = parseTabRef(raw);
  if (!ref) return { error: "bad_ref" };
  const key = keyOf(ref);
  if (chain.includes(key) || chain.length >= MAX_DEPTH) return { error: "loop" };
  let config: any;
  try {
    config = await load(ref.dashboard);
  } catch {
    return { error: "missing_dashboard" };
  }
  const found = findRefTab(config, ref);
  if (!found) return { error: "missing_tab" };
  const next = [...chain, key];
  let tab = expandTab(found.tab, plain(found.deck.tab_templates), plain(found.deck.tab_defaults));
  if (typeof tab.tab_ref === "string") {
    const inner = await resolveTabRef(tab.tab_ref, load, next);
    if (inner.error) return inner;
    const { tab_ref: _r, ...own } = tab;
    tab = { ...inner.tab, ...own };
  }
  // A deck inside the shared tab that refers back here would nest forever.
  const inside: string[] = [];
  nestedRefs(tab, inside);
  for (const r of inside) {
    const check = await resolveTabRef(r, load, next);
    if (check.error === "loop") return check;
  }
  const { tab_ref: _ref, ...plainTab } = tab;
  return { tab: plainTab };
}

function plain(v: any): Record<string, any> | undefined {
  return v && typeof v === "object" && !Array.isArray(v) ? v : undefined;
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

// The deck's raw config with every tab_ref replaced: the shared tab with the
// local keys on top, or (on an error) a tab that says what went wrong.
export async function resolveTabRefs(
  raw: any,
  load: (dashboard: string) => Promise<any>,
  message: (error: TabRefError, vars: Record<string, string>) => string,
): Promise<any> {
  const tabs = await Promise.all(
    raw.tabs.map(async (t: any) => {
      if (!t || typeof t !== "object" || t.tab_ref === undefined) return t;
      const { tab_ref, ...local } = t;
      const res = await resolveTabRef(String(tab_ref), load);
      if (res.tab) return { ...res.tab, ...local, tab_ref };
      const ref = parseTabRef(tab_ref);
      return {
        name: ref?.tab ?? String(tab_ref),
        icon: "mdi:link-variant-off",
        ...local,
        tab_ref,
        card: {
          type: "markdown",
          content: `<ha-alert alert-type="warning">${escape(message(res.error!, { ref: String(tab_ref), dashboard: ref?.dashboard ?? "", tab: ref?.tab ?? "" }))}</ha-alert>`,
        },
      };
    }),
  );
  return { ...raw, tabs };
}

// Until the shared tabs are loaded: their names on the bar, no content.
export function placeholderTabs(raw: any): any {
  return {
    ...raw,
    tabs: raw.tabs.map((t: any) =>
      t && typeof t === "object" && t.tab_ref !== undefined
        ? { name: parseTabRef(t.tab_ref)?.tab ?? String(t.tab_ref), icon: "mdi:link-variant", ...t, card: { type: "vertical-stack", cards: [] } }
        : t,
    ),
  };
}
