#!/usr/bin/env bash
set -euo pipefail

# On container start, bring up the Fresh dev server (hot-reloading).
# The startup logic is shared with the `dev`/`prod` aliases via run.sh.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$SCRIPT_DIR/run.sh" dev
