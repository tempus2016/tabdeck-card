import "./mock-cards";
import "../src/tabdeck-card";
import { MockHass } from "./mock-hass";
import { readStylePreset } from "../src/lib/style-preset";
import { encodeShare } from "../src/lib/share-code";
import { toYaml } from "../src/lib/yaml-dump";

// Every presets/community/*.json, bundled at build time (no network).
const FILES = import.meta.glob("../presets/community/*.json", { eager: true, import: "default" }) as Record<string, any>;

const TABS = [
  { name: "Home", icon: "mdi:home", card: { type: "entities", entities: ["light.kitchen", "light.living_room"] } },
  { name: "Lights", icon: "mdi:lightbulb-group", badge: "2", card: { type: "entities", entities: ["light.kitchen", "light.porch"] } },
  { name: "Climate", icon: "mdi:thermostat", card: { type: "thermostat", entity: "climate.hall" } },
];

const hass = new MockHass();
const cards: any[] = [];
const gallery = document.querySelector("#gallery")!;

async function copy(text: string, status: HTMLElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = "Copied.";
  } catch {
    status.textContent = "Copy failed: your browser blocked the clipboard.";
  }
  setTimeout(() => (status.textContent = ""), 2500);
}

for (const [path, raw] of Object.entries(FILES).sort(([a], [b]) => a.localeCompare(b))) {
  const { config, errors } = readStylePreset(raw);
  if (errors.length) continue;
  const id = path.split("/").pop()!.replace(/\.json$/, "");
  const item = document.createElement("article");
  item.className = "preset";
  item.id = id;
  const stage = document.createElement("div");
  stage.className = "preset-stage";
  const card: any = document.createElement("tabdeck-card");
  card.setConfig({ type: "custom:tabdeck-card", ...config, tabs: TABS });
  cards.push(card);
  stage.appendChild(card);
  const head = document.createElement("div");
  head.className = "preset-head";
  const name = document.createElement("h2");
  name.textContent = String(raw.name);
  const by = document.createElement("span");
  by.className = "preset-by";
  by.textContent = `by ${raw.author}`;
  head.append(name, by);
  const desc = document.createElement("p");
  desc.className = "preset-desc";
  desc.textContent = String(raw.description ?? "");
  const actions = document.createElement("div");
  actions.className = "actions";
  const status = document.createElement("span");
  status.className = "preset-status";
  status.setAttribute("role", "status");
  const json = JSON.stringify({ name: raw.name, author: raw.author, config }, null, 2);
  const yaml = toYaml(config);
  const button = (label: string, cls: string, run: () => void) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.className = cls;
    b.addEventListener("click", run);
    return b;
  };
  const tryIt = document.createElement("a");
  tryIt.textContent = "Try in the playground";
  tryIt.className = "preset-try";
  encodeShare(toYaml({ ...config, tabs: TABS })).then((h) => (tryIt.href = `./#${h}`));
  actions.append(
    button("Copy for the editor", "copy-json", () => copy(json, status)),
    button("Copy YAML", "copy-yaml", () => copy(yaml, status)),
    tryIt,
    status,
  );
  item.append(stage, head, desc, actions);
  gallery.appendChild(item);
}

hass.subscribe((h) => {
  for (const c of cards) c.hass = h;
});

document.querySelector<HTMLInputElement>("#dark")!.addEventListener("change", (e) => {
  document.documentElement.classList.toggle("light", !(e.target as HTMLInputElement).checked);
});
