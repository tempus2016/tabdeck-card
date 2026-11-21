// Instant dashboard (editor): a NEW storage dashboard holding one deck with a
// tab per room. It never writes to an existing dashboard: it picks a url_path
// no dashboard uses, creates it, checks it is still empty and only then saves
// the config. HA only lets admins create dashboards; that error is reported.

export type CallWS = (msg: Record<string, any>) => Promise<any>;

export class InstantDashboardError extends Error {
  constructor(
    public reason: "admin" | "failed",
    message: string,
  ) {
    super(message);
  }
}

// The first of base, base-2, base-3 … that no dashboard uses. The base has a
// hyphen because HA requires one in a dashboard url_path.
export function freeUrlPath(taken: Iterable<string>, base = "tabdeck-rooms"): string {
  const used = new Set(taken);
  if (!used.has(base)) return base;
  for (let n = 2; ; n++) if (!used.has(`${base}-${n}`)) return `${base}-${n}`;
}

// One panel view (the deck fills the page) with the deck.
export function instantDashboardConfig(tabs: any[], title: string): any {
  return {
    title,
    views: [{ title, path: "rooms", type: "panel", cards: [{ type: "custom:tabdeck-card", tabs }] }],
  };
}

const errText = (e: any) => String(e?.message ?? e?.code ?? e ?? "");

export async function createInstantDashboard(
  callWS: CallWS,
  tabs: any[],
  title: string,
): Promise<{ url_path: string; title: string }> {
  let created: any;
  try {
    const list = (await callWS({ type: "lovelace/dashboards/list" })) ?? [];
    const url_path = freeUrlPath(list.map((d: any) => d?.url_path).filter(Boolean));
    created = await callWS({
      type: "lovelace/dashboards/create",
      url_path,
      title,
      icon: "mdi:tab",
      mode: "storage",
      show_in_sidebar: true,
      require_admin: false,
    });
  } catch (e: any) {
    throw new InstantDashboardError(e?.code === "unauthorized" ? "admin" : "failed", errText(e));
  }
  const url_path = created?.url_path;
  if (!url_path) throw new InstantDashboardError("failed", "no url_path");
  // Iron rule: only save to a dashboard that has no config yet.
  let existing: any;
  try {
    existing = await callWS({ type: "lovelace/config", url_path, force: true });
  } catch (e: any) {
    if (e?.code !== "config_not_found") throw new InstantDashboardError("failed", errText(e));
  }
  if (existing) throw new InstantDashboardError("failed", `${url_path} already has a config`);
  try {
    await callWS({ type: "lovelace/config/save", url_path, config: instantDashboardConfig(tabs, title) });
  } catch (e: any) {
    // Take back the empty dashboard this call created (and nothing else).
    if (created?.id) await callWS({ type: "lovelace/dashboards/delete", dashboard_id: created.id }).catch(() => {});
    throw new InstantDashboardError("failed", errText(e));
  }
  return { url_path, title };
}
