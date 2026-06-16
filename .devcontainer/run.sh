#!/usr/bin/env bash
# Bring up the Fresh web app in one of two modes:
#   dev  - Fresh dev server via vite, hot-reloading (default)
#   prod - built Fresh bundle served live via `deno task start`, no auto-refresh
set -euo pipefail

MODE="${1:-dev}"
if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
  echo "usage: run.sh [dev|prod]" >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_DIR="/tmp"

cd "$WORKSPACE"

DENO_BIN="$(command -v deno || true)"
[ -z "$DENO_BIN" ] && DENO_BIN="$HOME/.deno/bin/deno"

if ! "$DENO_BIN" task "$MODE" --help >/dev/null 2>&1 && ! grep -q "\"$MODE\"" deno.json; then
  echo "[run:$MODE] No '$MODE' task in deno.json yet."
  echo "[run:$MODE] Scaffold the Fresh app first:  deno run -A -r jsr:@fresh/init ."
  exit 0
fi

echo "[run:$MODE] Stopping any previous instances..."
pkill -f "vite" 2>/dev/null || true
pkill -f "_fresh/server.js" 2>/dev/null || true

if [ "$MODE" = "prod" ]; then
  echo "[run:prod] Building Fresh production bundle..."
  "$DENO_BIN" task build
  echo "[run:prod] Starting Fresh production server on 0.0.0.0:8100 -> $LOG_DIR/web.log"
  setsid nohup "$DENO_BIN" task start </dev/null >"$LOG_DIR/web.log" 2>&1 &
else
  echo "[run:dev] Starting Fresh dev server on 0.0.0.0:5273 -> $LOG_DIR/web.log"
  setsid nohup "$DENO_BIN" task dev --host 0.0.0.0 </dev/null >"$LOG_DIR/web.log" 2>&1 &
fi
disown || true

sleep 1

echo "[run:$MODE] Done. Tail logs with: tail -f /tmp/web.log"
