import type { HomeAssistant } from "../types";

function checkState(c: any, hass: HomeAssistant): boolean {
  const stateObj = hass.states[c.entity];
  if (!stateObj) return false;
  const current = stateObj.state;
  if (Array.isArray(c.state)) return c.state.includes(current);
  if (c.state !== undefined) return current === c.state;
  if (c.state_not !== undefined) {
    return Array.isArray(c.state_not)
      ? !c.state_not.includes(current)
      : current !== c.state_not;
  }
  return false;
}

function checkNumeric(c: any, hass: HomeAssistant): boolean {
  const stateObj = hass.states[c.entity];
  if (!stateObj) return false;
  const value = Number(stateObj.state);
  if (Number.isNaN(value)) return false;
  if (c.above !== undefined && !(value > Number(c.above))) return false;
  if (c.below !== undefined && !(value < Number(c.below))) return false;
  return c.above !== undefined || c.below !== undefined;
}

function checkScreen(c: any): boolean {
  if (!c.media_query || typeof matchMedia !== "function") return false;
  return matchMedia(c.media_query).matches;
}

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function toMinutes(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(s));
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

// `time` condition: after/before "HH:MM" (overnight ranges supported) and/or a
// weekday list. `now` is injectable for testing.
function checkTime(c: any, now: Date = new Date()): boolean {
  const hasAfter = c.after !== undefined;
  const hasBefore = c.before !== undefined;
  const hasWeekday = Array.isArray(c.weekday) && c.weekday.length > 0;
  if (!hasAfter && !hasBefore && !hasWeekday) return false;
  const cur = now.getHours() * 60 + now.getMinutes();
  let ok = true;
  if (hasAfter && hasBefore) {
    const a = toMinutes(c.after);
    const b = toMinutes(c.before);
    if (a === null || b === null) return false;
    ok = a <= b ? cur >= a && cur < b : cur >= a || cur < b; // overnight wrap
  } else if (hasAfter) {
    const a = toMinutes(c.after);
    if (a === null) return false;
    ok = cur >= a;
  } else if (hasBefore) {
    const b = toMinutes(c.before);
    if (b === null) return false;
    ok = cur < b;
  }
  if (ok && hasWeekday) {
    const today = WEEKDAYS[now.getDay()];
    ok = c.weekday.map((d: string) => String(d).toLowerCase().slice(0, 3)).includes(today);
  }
  return ok;
}

function checkUser(c: any, hass: HomeAssistant): boolean {
  const uid = (hass as any)?.user?.id;
  if (!uid || !Array.isArray(c.users)) return false;
  return c.users.includes(uid);
}

// Resolves a `template` condition's value_template to a rendered boolean, or
// undefined while the template is still pending (treated as not met).
export type TemplateResolver = (valueTemplate: string) => boolean | undefined;

function checkTemplate(c: any, resolver?: TemplateResolver): boolean {
  if (!resolver || !c.value_template) return false;
  return resolver(c.value_template) === true;
}

function subConditions(c: any): any[] {
  return Array.isArray(c?.conditions) ? c.conditions : [];
}

function checkOne(c: any, hass: HomeAssistant, resolver?: TemplateResolver): boolean {
  switch (c?.condition) {
    case "state":
      return checkState(c, hass);
    case "numeric_state":
      return checkNumeric(c, hass);
    case "screen":
      return checkScreen(c);
    case "time":
      return checkTime(c);
    case "user":
      return checkUser(c, hass);
    case "template":
      return checkTemplate(c, resolver);
    // Logical groups (match Home Assistant's condition system) — nestable.
    case "and":
      return subConditions(c).every((s) => checkOne(s, hass, resolver));
    case "or":
      return subConditions(c).some((s) => checkOne(s, hass, resolver));
    case "not":
      return !subConditions(c).some((s) => checkOne(s, hass, resolver));
    default:
      return false;
  }
}

export function isTabVisible(
  visibility: any[] | undefined,
  hass: HomeAssistant | undefined,
  templateResolver?: TemplateResolver,
): boolean {
  if (!visibility || visibility.length === 0) return true;
  if (!hass) return true;
  return visibility.every((c) => checkOne(c, hass, templateResolver));
}
