import type { HomeAssistant } from "../types";
import { checkOne, type TemplateResolver } from "./conditions";

// A condition evaluated against live state, for the editor's "why is this tab
// hidden?" panel. Structured (not text) so the editor can localise it.
export interface ConditionExplanation {
  type: string;
  met: boolean;
  entity?: string;
  // Current entity state, when the condition reads one.
  current?: string;
  // The entity doesn't exist (a typo or a removed device).
  missing?: boolean;
  expected?: string[];
  negate?: boolean;
  above?: number;
  below?: number;
  media_query?: string;
  after?: string;
  before?: string;
  weekday?: string[];
  count?: number;
  pending?: boolean;
  children?: ConditionExplanation[];
}

export interface ExplainResult {
  met: boolean;
  items: ConditionExplanation[];
}

const asList = (v: any): string[] => (Array.isArray(v) ? v.map(String) : [String(v)]);

function explainOne(c: any, hass: HomeAssistant, resolver?: TemplateResolver): ConditionExplanation {
  const type = String(c?.condition ?? "unknown");
  const met = checkOne(c, hass, resolver);
  const stateObj = c?.entity ? hass.states?.[c.entity] : undefined;
  const entityInfo = c?.entity
    ? { entity: String(c.entity), current: stateObj?.state, missing: !stateObj }
    : {};
  switch (type) {
    case "state": {
      const negate = c.state === undefined && c.state_not !== undefined;
      return { type, met, ...entityInfo, negate, expected: asList(negate ? c.state_not : c.state) };
    }
    case "numeric_state":
      return {
        type,
        met,
        ...entityInfo,
        above: c.above === undefined ? undefined : Number(c.above),
        below: c.below === undefined ? undefined : Number(c.below),
      };
    case "screen":
      return { type, met, media_query: c.media_query };
    case "time":
      return {
        type,
        met,
        after: c.after,
        before: c.before,
        weekday: Array.isArray(c.weekday) ? c.weekday.map(String) : undefined,
      };
    case "user":
      return { type, met, count: Array.isArray(c.users) ? c.users.length : 0 };
    case "template":
      return { type, met, pending: resolver ? resolver(c.value_template) === undefined : true };
    case "and":
    case "or":
    case "not": {
      const subs = Array.isArray(c.conditions) ? c.conditions : [];
      return { type, met, children: subs.map((s: any) => explainOne(s, hass, resolver)) };
    }
    default:
      return { type: "unknown", met: false };
  }
}

// Every condition must be met (the same rule the card uses for visibility).
export function explainConditions(
  conditions: any[] | undefined,
  hass: HomeAssistant,
  resolver?: TemplateResolver,
): ExplainResult {
  const list = Array.isArray(conditions) ? conditions : [];
  const items = list.map((c) => explainOne(c, hass, resolver));
  return { met: items.every((i) => i.met), items };
}

// Compact fingerprint of the parts that render, so the editor only redraws
// when a result or a shown value actually changes.
export function conditionsSignature(r: ExplainResult): string {
  const walk = (i: ConditionExplanation): string =>
    `${i.met ? 1 : 0}${i.current ?? ""}${i.pending ? "p" : ""}(${(i.children ?? []).map(walk).join(",")})`;
  return r.items.map(walk).join("|");
}
