import { describe, it, expect } from "vitest";
import { notificationItems, rawText, repairItems } from "./client-sources";

describe("rawText", () => {
  it("wraps template syntax so the markdown card shows it as written", () => {
    expect(rawText("plain")).toBe("plain");
    expect(rawText("use {{ x }}")).toBe("{% raw %}use {{ x }}{% endraw %}");
  });
});

describe("notificationItems", () => {
  it("lists notifications newest first with a fallback title", () => {
    const items = notificationItems(
      {
        a: { notification_id: "a", title: "Old", message: "m1", created_at: "2026-11-01T00:00:00Z" },
        b: { notification_id: "b", title: "", message: "m2", created_at: "2026-11-09T00:00:00Z" },
      },
      { untitled: "Notification", dismiss: "Dismiss" },
    );
    expect(items.map((i) => [i.id, i.name])).toEqual([
      ["b", "Notification"],
      ["a", "Old"],
    ]);
    expect(items[0].dismiss).toBe("Dismiss");
  });
});

describe("repairItems", () => {
  it("drops ignored issues and sorts by severity", () => {
    const items = repairItems(
      [
        { issue_id: "w", domain: "hacs", translation_key: "restart_required", severity: "warning" },
        { issue_id: "i", domain: "x", severity: "error", ignored: true },
        { issue_id: "c", domain: "zha", translation_key: "bad_stick", severity: "critical" },
      ],
      (issue, part) => (issue.issue_id === "c" && part === "title" ? "Zigbee stick missing" : undefined),
      { open: "Open Repairs" },
    );
    expect(items.map((i) => [i.id, i.name, i.icon])).toEqual([
      ["c", "Zigbee stick missing", "mdi:alert-octagon"],
      ["w", "hacs: restart required", "mdi:alert"],
    ]);
    expect(items[0].open).toBe("Open Repairs");
  });
});
