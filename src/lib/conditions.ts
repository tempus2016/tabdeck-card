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
