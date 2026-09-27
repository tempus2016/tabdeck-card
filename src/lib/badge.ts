// Numeric badge formatting: round to a precision, cap at a maximum ("99+"),
// append a unit. Non-numeric values pass through untouched.

export interface BadgeFormat {
  precision?: number;
  unit?: string;
  max?: number;
}

export function normalizeBadgeFormat(raw: any): BadgeFormat | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: BadgeFormat = {};
  const precision = Number(raw.precision);
  if (raw.precision !== undefined && Number.isInteger(precision) && precision >= 0 && precision <= 6) {
    out.precision = precision;
  }
  const max = Number(raw.max);
  if (raw.max !== undefined && Number.isFinite(max)) out.max = max;
  if (typeof raw.unit === "string") out.unit = raw.unit;
  return out;
}

function isNumeric(value: string): boolean {
  return value.trim() !== "" && Number.isFinite(Number(value));
}

export function formatBadge(value: string | undefined, fmt: BadgeFormat | undefined): string | undefined {
  if (value === undefined || !fmt || !isNumeric(value)) return value;
  const n = Number(value);
  let text: string;
  if (fmt.max !== undefined && n > fmt.max) {
    text = `${fmt.max}+`;
  } else if (fmt.precision !== undefined) {
    text = n.toFixed(fmt.precision);
  } else {
    text = value.trim();
  }
  return fmt.unit ? text + fmt.unit : text;
}
