import { describe, it, expect } from "vitest";
import * as mdi from "@mdi/js";
import { ALL_SUGGESTED_ICONS, suggestIcons } from "./icon-suggest";

const first = (name: string) => suggestIcons(name)[0];

describe("suggestIcons", () => {
  it("suggests from English names, best first", () => {
    expect(suggestIcons("Kitchen")).toEqual([
      "mdi:silverware-fork-knife",
      "mdi:stove",
      "mdi:fridge",
      "mdi:pot-steam",
      "mdi:coffee",
    ]);
    expect(first("Living room")).toBe("mdi:sofa");
    expect(first("Kitchen lights")).toBe("mdi:silverware-fork-knife");
    expect(suggestIcons("Kitchen lights")).toContain("mdi:lightbulb");
    expect(first("CCTV")).toBe("mdi:cctv");
    expect(suggestIcons("Kitchen lights", 3)).toHaveLength(3);
  });

  it("knows the editor's other languages, compounds and accents", () => {
    expect(first("Küche")).toBe("mdi:silverware-fork-knife");
    expect(first("Wohnzimmer")).toBe("mdi:sofa");
    expect(first("Kinderzimmer")).toBe("mdi:teddy-bear");
    expect(first("Cocina")).toBe("mdi:silverware-fork-knife");
    expect(first("Salle de bain")).toBe("mdi:shower");
    expect(first("Camera da letto")).toBe("mdi:bed");
    expect(first("Słońce i energia")).toBe("mdi:lightning-bolt");
    expect(first("Łazienka")).toBe("mdi:shower");
    expect(first("Cozinha")).toBe("mdi:silverware-fork-knife");
    expect(first("Woonkamer")).toBe("mdi:sofa");
  });

  it("short and marked keywords only match whole words", () => {
    expect(suggestIcons("Automations")).not.toContain("mdi:car");
    expect(first("Auto")).toBe("mdi:car");
    expect(suggestIcons("Temperatur")).not.toContain("mdi:door");
    expect(first("Bureau")).toBe("mdi:desk");
  });

  it("nothing for unknown words, templates or non-strings", () => {
    expect(suggestIcons("Zxq")).toEqual([]);
    expect(suggestIcons("{{ states('sensor.x') }}")).toEqual([]);
    expect(suggestIcons(undefined)).toEqual([]);
    expect(suggestIcons("  ")).toEqual([]);
  });

  it("every icon exists in Material Design Icons", () => {
    const camel = (i: string) => "mdi" + i.slice(4).replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
    expect(ALL_SUGGESTED_ICONS.filter((i) => !(camel(i) in mdi))).toEqual([]);
  });
});
