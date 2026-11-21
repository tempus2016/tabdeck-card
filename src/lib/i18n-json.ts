// Translation files ↔ JSON for Weblate (scripts/i18n-json.mjs). The source of
// truth for the build is src/translations/<set>/<lang>.ts; i18n/<set>/<lang>.json
// is a flat { key: text } copy that Weblate edits. Every entry line in the TS
// files is `  "key": "text",` with JSON string escapes, so both directions are
// plain line edits that keep comments and order.

const ENTRY = /^ {2}("(?:[^"\\]|\\.)+"): ("(?:[^"\\]|\\.)*"),$/;

// The { key: text } object of a translation .ts file.
export function tsToStrings(ts: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of ts.split("\n")) {
    const m = ENTRY.exec(line);
    if (m) out[JSON.parse(m[1])] = JSON.parse(m[2]);
  }
  return out;
}

// The .ts file with its texts replaced from `strings`: keys it has keep their
// line (a key missing from `strings` keeps its text), new keys are appended
// before the closing `};` in `order` (the English key order). Keys in
// `strings` that English doesn't have are dropped.
export function applyStrings(ts: string, strings: Record<string, string>, order: string[] = Object.keys(strings)): string {
  const known = new Set(order);
  const seen = new Set<string>();
  const lines = ts.split("\n").map((line) => {
    const m = ENTRY.exec(line);
    if (!m) return line;
    const key = JSON.parse(m[1]);
    seen.add(key);
    const text = strings[key];
    return typeof text === "string" ? `  ${m[1]}: ${JSON.stringify(text)},` : line;
  });
  const extra = order.filter((k) => !seen.has(k) && known.has(k) && typeof strings[k] === "string");
  if (!extra.length) return lines.join("\n");
  const close = lines.lastIndexOf("};");
  if (close < 0) throw new Error("no closing }; in the translation file");
  lines.splice(close, 0, ...extra.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(strings[k])},`));
  return lines.join("\n");
}

// Stable JSON for Weblate: 2-space indent, trailing newline, unicode as is.
export function toJson(strings: Record<string, string>): string {
  return JSON.stringify(strings, null, 2) + "\n";
}

// Placeholders ({n}, {name}) and plural labels (one:, other:) a text uses, to
// check a translation keeps them.
export function placeholders(text: string): string[] {
  return [...new Set(text.match(/\{[a-z_]+\}/g) ?? [])].sort();
}
