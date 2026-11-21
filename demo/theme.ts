import "./mock-cards";
import "../src/tabdeck-card";
import { MockHass } from "./mock-hass";
import { THEME_DEFAULTS, themeOptions, type ThemeForm } from "../src/lib/theme-builder";
import { toYaml } from "../src/lib/yaml-dump";

const hass = new MockHass();
const $ = <T extends HTMLElement>(sel: string) => document.querySelector(sel) as T;
const form = $<HTMLFormElement>("#form");
const stage = $("#stage");
const out = $<HTMLTextAreaElement>("#theme-yaml");

// The sample deck the look is applied to.
const TABS = [
  { name: "Home", icon: "mdi:home", card: { type: "entities", entities: ["light.kitchen", "light.living_room", "climate.hall"] } },
  {
    name: "Lights",
    icon: "mdi:lightbulb-group",
    badge: "{{ states.light | selectattr('state','eq','on') | list | count }}",
    card: { type: "entities", entities: ["light.kitchen", "light.living_room", "light.bedroom", "light.porch"] },
  },
  { name: "Climate", icon: "mdi:thermostat", subtitle: "19.4 °C", card: { type: "thermostat", entity: "climate.hall" } },
  { name: "Media", icon: "mdi:television", card: { type: "media-control", entity: "media_player.lounge_tv" } },
];

let card: any;
let latest: any;

function read(): Partial<ThemeForm> {
  const data = new FormData(form);
  const get = (k: string) => String(data.get(k) ?? "");
  const radius = Number(get("indicator_radius"));
  return {
    preset: get("preset"),
    style: get("style"),
    position: get("position"),
    tab_display: get("tab_display"),
    align: get("align"),
    density: get("density"),
    indicator_size: Number(get("indicator_size")),
    indicator_radius: radius < 0 ? "" : radius,
    elevation: data.get("elevation") === "on",
    accent: get("accent").trim(),
    bar_background: get("bar_background").trim(),
    indicator_color: get("indicator_color").trim(),
    badge_color: get("badge_color").trim(),
    font_family: get("font_family"),
  };
}

function render(): void {
  const values = read();
  const options = themeOptions(values);
  $("#size-out").textContent = `${values.indicator_size} px`;
  $("#radius-out").textContent = values.indicator_radius === "" ? "style's" : `${values.indicator_radius} px`;
  out.value = Object.keys(options).length ? toYaml(options) : "# Nothing changed yet: the card's defaults.\n";
  card?.remove();
  card = document.createElement("tabdeck-card");
  card.setConfig({ type: "custom:tabdeck-card", ...options, tabs: TABS });
  if (latest) card.hass = latest;
  stage.appendChild(card);
}

// A colour picker fills its text field (which can also take a theme
// variable or a colour name).
for (const picker of form.querySelectorAll<HTMLInputElement>("input[type=color]")) {
  picker.addEventListener("input", () => {
    const text = form.querySelector<HTMLInputElement>(`input[name=${picker.dataset.for}]`)!;
    text.value = picker.value;
    render();
  });
}
form.addEventListener("input", (e) => {
  const el = e.target as HTMLInputElement;
  if (el.type === "color") return;
  // Typing a hex colour moves its swatch too.
  const swatch = form.querySelector<HTMLInputElement>(`input[type=color][data-for="${el.name}"]`);
  if (swatch && /^#[0-9a-f]{6}$/i.test(el.value.trim())) swatch.value = el.value.trim();
  render();
});
form.addEventListener("change", render);

$("#reset").addEventListener("click", () => {
  form.reset();
  for (const [k, v] of Object.entries(THEME_DEFAULTS)) {
    const el = form.elements.namedItem(k) as HTMLInputElement | null;
    if (!el) continue;
    if (el.type === "checkbox") el.checked = !!v;
    else if (k === "indicator_radius") el.value = "-1";
    else el.value = String(v);
  }
  render();
});

$("#copy").addEventListener("click", async () => {
  let ok = false;
  try {
    await navigator.clipboard.writeText(out.value);
    ok = true;
  } catch {
    out.select();
    ok = document.execCommand("copy");
  }
  $("#copied").textContent = ok ? "Copied." : "Select the text and copy it.";
  setTimeout(() => ($("#copied").textContent = ""), 2000);
});

hass.subscribe((h) => {
  latest = h;
  if (card) card.hass = h;
});

$<HTMLInputElement>("#dark").addEventListener("change", (e) => {
  document.documentElement.classList.toggle("light", !(e.target as HTMLInputElement).checked);
});

for (const b of document.querySelectorAll<HTMLButtonElement>("[data-width]")) {
  b.addEventListener("click", () => {
    stage.style.maxWidth = b.dataset.width!;
    for (const o of document.querySelectorAll("[data-width]")) o.classList.toggle("active", o === b);
  });
}

render();
