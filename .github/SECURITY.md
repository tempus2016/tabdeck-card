# Security Policy

Tabdeck Card is a Home Assistant Lovelace **frontend plugin** (a custom card).
It runs entirely in the browser inside your Home Assistant dashboard and stores
nothing outside it — the only state it persists is the last-selected tab in the
browser's `localStorage` (when `remember: browser` is enabled). Nothing is sent
to any external service.

Because the card runs inside Home Assistant, the most relevant security
boundary is the one Home Assistant itself enforces (authenticated users, the
HTTP/WebSocket API, and Lovelace). The most likely classes of issue in this
card specifically are:

- Rendering attacker-influenced text (for example a tab `name`, `badge` value,
  or entity state) without escaping — a potential XSS in the dashboard. The
  card renders through Lit templates, which auto-escape interpolated values, so
  any bypass of that is worth reporting.
- A nested card config being passed through in a way that bypasses Home
  Assistant's normal card validation.

## Supported versions

Only the **latest released version** receives security fixes. Before reporting,
please update to the newest release and confirm the issue still reproduces.

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately using GitHub's
[private vulnerability reporting](https://github.com/tempus2016/tabdeck-card/security/advisories/new)
(the **Report a vulnerability** button under the repository's **Security** tab).
This keeps the details private until a fix is available.

When reporting, please include:

- The Tabdeck Card version and Home Assistant version.
- A description of the issue and its impact.
- Steps to reproduce, including the relevant card YAML.

## What to expect

This is a community project maintained in spare time, so timelines are
best-effort:

- **Acknowledgement** of your report as soon as is practical.
- An assessment and, if confirmed, a fix in a subsequent release.
- Credit in the release notes, unless you'd prefer to stay anonymous.

Thank you for helping keep Tabdeck Card and its users safe.
