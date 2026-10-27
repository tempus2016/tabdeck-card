import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type DefaultTheme } from "vitepress";

// The docs site is built straight from the wiki (wiki/*.md, also mirrored to
// the GitHub wiki), so there is one source for both. Home.md becomes the
// front page; wiki/_Sidebar.md becomes the sidebar. The live demo is built
// into /demo/ next to it (npm run build:site).
const REPO = "https://github.com/tempus2016/tabdeck-card";
const DEMO = "https://tempus2016.github.io/tabdeck-card/demo/";
const wikiDir = fileURLToPath(new URL("../../wiki/", import.meta.url));

// GitHub-wiki link targets ("Feature-Presets#x", "Home") as site paths.
function sitePath(target: string): string {
  if (/^https?:\/\//.test(target)) return target;
  const [page, hash] = target.split("#");
  const path = page === "Home" || page === "" ? "/" : `/${page}`;
  return hash ? `${path}#${hash}` : path;
}

// wiki/_Sidebar.md: "**Group**" lines start a group, "- [Text](Target)" are
// links; the "### Title" line is skipped.
function sidebarFromWiki(): DefaultTheme.SidebarItem[] {
  const groups: DefaultTheme.SidebarItem[] = [{ text: "Tabdeck Card", items: [] }];
  for (const line of readFileSync(wikiDir + "_Sidebar.md", "utf8").split("\n")) {
    const group = /^\*\*(.+)\*\*\s*$/.exec(line.trim());
    if (group) {
      groups.push({ text: group[1], collapsed: false, items: [] });
      continue;
    }
    const link = /^-\s*\[(.+?)\]\((.+?)\)/.exec(line.trim());
    if (link) groups[groups.length - 1].items!.push({ text: link[1], link: sitePath(link[2]) });
  }
  return groups;
}

export default defineConfig({
  title: "Tabdeck Card",
  description: "A modern tabbed card for Home Assistant dashboards.",
  base: "/tabdeck-card/",
  srcDir: "../wiki",
  srcExclude: ["_Sidebar.md", "_Footer.md"],
  outDir: "../site",
  cleanUrls: true,
  rewrites: { "Home.md": "index.md" },
  head: [["link", { rel: "icon", href: "/tabdeck-card/icon.png" }]],
  vite: { publicDir: fileURLToPath(new URL("../public", import.meta.url)) },
  markdown: {
    config(md) {
      // Wiki pages show Jinja ({{ states(...) }}) in inline code; keep Vue
      // from treating it as a template expression.
      const inline = md.renderer.rules.code_inline!;
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) =>
        inline(tokens, idx, options, env, self).replace(/^<code/, "<code v-pre");
      // GitHub-wiki links: "Home" is the front page here.
      md.core.ruler.push("wiki-links", (state) => {
        for (const block of state.tokens) {
          for (const t of block.children ?? []) {
            if (t.type !== "link_open") continue;
            const href = t.attrGet("href") ?? "";
            if (href === "Home" || href.startsWith("Home#")) t.attrSet("href", sitePath(href));
          }
        }
      });
    },
  },
  themeConfig: {
    logo: "/icon.png",
    nav: [
      { text: "Live demo", link: DEMO },
      { text: "Install", link: "/Installation" },
      { text: "Configuration", link: "/Configuration" },
    ],
    sidebar: sidebarFromWiki(),
    socialLinks: [{ icon: "github", link: REPO }],
    search: { provider: "local" },
    editLink: { pattern: `${REPO}/edit/main/wiki/:path`, text: "Edit this page on GitHub" },
    outline: { level: [2, 3] },
  },
});
