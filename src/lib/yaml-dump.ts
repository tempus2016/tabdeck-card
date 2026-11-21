// A small YAML writer for configs (objects, arrays, strings, numbers,
// booleans, null), so the editor can show exported YAML without bundling a
// YAML library. Strings are quoted whenever plain YAML could misread them.

const PLAIN = /^[A-Za-z_/][\w ./()+:-]*$/;
const RESERVED = /^(true|false|yes|no|on|off|null|~|y|n)$/i;

function scalar(v: unknown): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  const s = String(v);
  if (s !== "" && PLAIN.test(s) && !RESERVED.test(s) && !/ $/.test(s) && !/: |:$| #/.test(s)) return s;
  return JSON.stringify(s);
}

function isEmpty(v: unknown): boolean {
  return (Array.isArray(v) && v.length === 0) || (!!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);
}

function block(v: unknown, indent: string): string[] {
  if (Array.isArray(v)) {
    return v.flatMap((item) => {
      if (item && typeof item === "object" && !isEmpty(item)) {
        const lines = block(item, indent + "  ");
        return [`${indent}- ${lines[0].trimStart()}`, ...lines.slice(1)];
      }
      return [`${indent}- ${isEmpty(item) ? (Array.isArray(item) ? "[]" : "{}") : scalar(item)}`];
    });
  }
  return Object.entries(v as Record<string, unknown>)
    .filter(([, val]) => val !== undefined)
    .flatMap(([key, val]) => {
      const k = scalar(key);
      if (val && typeof val === "object" && !isEmpty(val)) return [`${indent}${k}:`, ...block(val, indent + "  ")];
      const text =
        typeof val === "string" && val.includes("\n")
          ? "|-\n" + val.split("\n").map((l) => (l ? indent + "  " + l : "")).join("\n")
          : isEmpty(val)
            ? Array.isArray(val) ? "[]" : "{}"
            : scalar(val);
      return [`${indent}${k}: ${text}`];
    });
}

export function toYaml(value: unknown): string {
  if (value === null || typeof value !== "object") return scalar(value) + "\n";
  if (isEmpty(value)) return (Array.isArray(value) ? "[]" : "{}") + "\n";
  return block(value, "").join("\n") + "\n";
}
