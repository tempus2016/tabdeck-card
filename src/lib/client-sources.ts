// auto_tabs sources that Jinja can't see: Repairs issues and persistent
// notifications. The card fetches them over the websocket (both need an
// admin user for repairs; notifications work for everyone) and turns them
// into items for the source's tab blueprint.

export interface NotificationEntry {
  notification_id: string;
  title?: string | null;
  message?: string | null;
  created_at?: string;
}

export interface RepairIssue {
  issue_id: string;
  domain: string;
  translation_key?: string | null;
  translation_placeholders?: Record<string, string> | null;
  severity?: "critical" | "error" | "warning" | string;
  ignored?: boolean;
  dismissed_version?: string | null;
  created?: string;
}

// The markdown card renders its content as a template, so text from HA
// (a notification message) is wrapped to show braces as written.
export function rawText(text: string): string {
  return /\{[{%#]/.test(text) ? `{% raw %}${text}{% endraw %}` : text;
}

// Newest first.
export function notificationItems(
  entries: Record<string, NotificationEntry>,
  labels: { untitled: string; dismiss: string },
): any[] {
  return Object.values(entries)
    .sort((a, b) => Date.parse(b.created_at ?? "") - Date.parse(a.created_at ?? "") || 0)
    .map((n) => ({
      id: n.notification_id,
      name: n.title?.trim() || labels.untitled,
      message: rawText(n.message ?? ""),
      created: n.created_at ?? "",
      dismiss: labels.dismiss,
    }));
}

const SEVERITY_ICON: Record<string, string> = {
  critical: "mdi:alert-octagon",
  error: "mdi:alert-circle",
  warning: "mdi:alert",
};
const SEVERITY_ORDER: Record<string, number> = { critical: 0, error: 1, warning: 2 };

// Open, not-ignored issues, most severe first. `text(issue, part)` returns
// the issue's translated title / description (or undefined).
export function repairItems(
  issues: RepairIssue[],
  text: (issue: RepairIssue, part: "title" | "description") => string | undefined,
  labels: { open: string },
): any[] {
  return issues
    .filter((i) => !i.ignored && !i.dismissed_version)
    .map((i, n) => ({ i, n }))
    .sort(
      (a, b) =>
        (SEVERITY_ORDER[a.i.severity ?? ""] ?? 3) - (SEVERITY_ORDER[b.i.severity ?? ""] ?? 3) || a.n - b.n,
    )
    .map(({ i }) => ({
      id: i.issue_id,
      domain: i.domain,
      severity: i.severity ?? "warning",
      icon: SEVERITY_ICON[i.severity ?? ""] ?? "mdi:wrench",
      name: text(i, "title") || `${i.domain}: ${(i.translation_key ?? i.issue_id).replace(/_/g, " ")}`,
      description: rawText(text(i, "description") ?? ""),
      open: labels.open,
    }));
}
