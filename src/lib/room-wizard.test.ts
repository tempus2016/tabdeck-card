import { describe, it, expect, vi } from "vitest";
import { loadRegistries, roomList, roomTabs } from "./room-wizard";

const reg = {
  areas: [
    { area_id: "kitchen", name: "Kitchen", icon: "mdi:stove" },
    { area_id: "lounge", name: "Lounge" },
    { area_id: "attic", name: "Attic" },
  ],
  devices: [{ id: "d1", area_id: "lounge" }, { id: "d2" }],
  entities: [
    { entity_id: "light.kitchen", area_id: "kitchen" },
    { entity_id: "sensor.kitchen_temp", device_id: "d1", area_id: "kitchen" },
    { entity_id: "light.lounge", device_id: "d1" },
    { entity_id: "sensor.lounge_rssi", device_id: "d1", entity_category: "diagnostic" },
    { entity_id: "switch.hidden", area_id: "lounge", hidden: true },
    { entity_id: "switch.off", area_id: "lounge", disabled_by: "user" },
    { entity_id: "light.gone", area_id: "lounge" },
    { entity_id: "light.nowhere", device_id: "d2" },
  ],
};
const states = Object.fromEntries(
  ["light.kitchen", "sensor.kitchen_temp", "light.lounge", "sensor.lounge_rssi", "switch.hidden", "switch.off", "light.nowhere"].map((id) => [id, { state: "on" }]),
);

describe("room wizard", () => {
  it("lists areas with their entities (own area wins over the device's)", () => {
    expect(roomList(reg, states)).toEqual([
      { id: "attic", name: "Attic", icon: undefined, entities: [] },
      { id: "kitchen", name: "Kitchen", icon: "mdi:stove", entities: ["light.kitchen", "sensor.kitchen_temp"] },
      { id: "lounge", name: "Lounge", icon: undefined, entities: ["light.lounge"] },
    ]);
  });

  it("makes a tab per room", () => {
    const [kitchen, lounge] = roomTabs(roomList(reg, states).slice(1));
    expect(kitchen).toEqual({
      name: "Kitchen",
      icon: "mdi:stove",
      area: "kitchen",
      card: { type: "entities", title: "Kitchen", entities: ["light.kitchen", "sensor.kitchen_temp"] },
    });
    expect(lounge.icon).toBe("mdi:texture-box");
  });

  it("reads hass's registries, or asks over WebSocket", async () => {
    const hass = { areas: { a: { area_id: "a" } }, devices: {}, entities: { "x.y": { entity_id: "x.y" } } };
    expect(await loadRegistries(hass)).toEqual({ areas: [{ area_id: "a" }], devices: [], entities: [{ entity_id: "x.y" }] });
    const callWS = vi.fn(async ({ type }: any) => (type === "config/area_registry/list" ? [{ area_id: "b" }] : type === "config/device_registry/list" ? Promise.reject(new Error("no")) : []));
    expect(await loadRegistries({ callWS })).toEqual({ areas: [{ area_id: "b" }], devices: [], entities: [] });
    expect(callWS).toHaveBeenCalledTimes(3);
  });
});
