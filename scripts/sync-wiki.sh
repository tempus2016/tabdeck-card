#!/usr/bin/env bash
# Sync the version-controlled wiki/ directory to the GitHub wiki git repo.
#
# One-time prerequisite (GitHub limitation): the wiki git repo does not exist
# until the FIRST wiki page is created via the web UI. Open
#   https://github.com/tempus2016/tabdeck-card/wiki
# click "Create the first page", save anything, then run this script.
#
# Auth: uses the PAT stored in ~/.git-credentials.
set -euo pipefail

REPO="tempus2016/tabdeck-card"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/wiki"
TOKEN="$(sed -nE 's#https://[^:]+:([^@]+)@github\.com#\1#p' ~/.git-credentials | head -1)"
REMOTE="https://tempus2016:${TOKEN}@github.com/${REPO}.wiki.git"
WORK="$(mktemp -d)"

echo "Cloning wiki repo..."
git clone "$REMOTE" "$WORK"

echo "Copying wiki/ -> wiki repo (images included)..."
# Remove tracked files (keep .git), then copy fresh — avoids an rsync dependency.
find "$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a "$SRC_DIR"/. "$WORK"/

cd "$WORK"
git config user.name tempus2016
git config user.email john_mackinnon@live.co.uk
git add -A
if git diff --cached --quiet; then
  echo "Wiki already up to date."
else
  git commit -m "docs(wiki): sync from repo wiki/"
  git push origin HEAD
  echo "Wiki synced."
fi

rm -rf "$WORK"
