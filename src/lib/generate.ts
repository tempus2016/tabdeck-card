import type { AutoTabsConfig } from "./config";

// Matches ONLY our client-side tokens: `index`, `item`, or a dotted item path
// like `item.foo.bar`. Anything containing parentheses, operators or quotes
// (i.e. a real HA Jinja expression) will not match and is left untouched so it
// flows through to Home Assistant's renderer.
const TOKEN = /\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g;
const WHOLE = /^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;

function resolvePath(item: any, token: string): any {
  if (token === "item") return item;
  const parts = token.split("."); // ["item", "a", "b"]
  let v = item;
  for (let i = 1; i < parts.length; i++) v = v == null ? undefined : v[parts[i]];
  return v;
}

// Recursively substitute `item`/`index` tokens through a value. Strings that are
// a single whole token preserve the resolved value's type (so `entity: "{{ item }}"`
// yields the item object/number, not its string form); embedded tokens interpolate
// as strings. Non-string leaves pass through unchanged.
export function substituteTokens(value: any, item: any, index: number): any {
  if (typeof value === "string") {
    const whole = value.match(WHOLE);
    if (whole) {
      const t = whole[1];
      if (t === "index") return index;
      const resolved = resolvePath(item, t);
      return resolved === undefined ? "" : resolved;
    }
    return value.replace(TOKEN, (_m, t) =>
      t === "index" ? String(index) : String(resolvePath(item, t) ?? ""),
    );
  }
  if (Array.isArray(value)) return value.map((v) => substituteTokens(v, item, index));
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    for (const k of Object.keys(value)) out[k] = substituteTokens(value[k], item, index);
    return out;
  }
  return value;
}

// Expand a template-rendered list into raw tab configs. With a `tab_template`,
// fill it per item; without one, each list element must already be a tab object.
export function expandGeneratedTabs(items: any, auto: AutoTabsConfig): any[] {
  if (!Array.isArray(items)) return [];
  const tpl = auto.tab_template;
  const out: any[] = [];
  items.forEach((item, index) => {
    if (tpl) {
      out.push(substituteTokens(tpl, item, index));
    } else if (item && typeof item === "object" && !Array.isArray(item)) {
      out.push(item);
    }
  });
  return out;
}
