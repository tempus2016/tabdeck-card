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

function checkOne(c: any, hass: HomeAssistant): boolean {
  switch (c?.condition) {
    case "state":
      return checkState(c, hass);
    case "numeric_state":
      return checkNumeric(c, hass);
    case "screen":
      return checkScreen(c);
    default:
      return false;
  }
}

export function isTabVisible(
  visibility: any[] | undefined,
  hass: HomeAssistant | undefined,
): boolean {
  if (!visibility || visibility.length === 0) return true;
  if (!hass) return true;
  return visibility.every((c) => checkOne(c, hass));
}
