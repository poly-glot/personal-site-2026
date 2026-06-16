#!/usr/bin/env bash
set -euo pipefail

echo "=== personal-site-2026 Development Container Setup ==="

sudo apt-get update -qq
sudo apt-get install -y -qq --no-install-recommends \
  curl wget jq htop unzip

echo "Upgrading Claude Code to latest..."
NPM_GLOBAL="$HOME/.npm-global"
mkdir -p "$NPM_GLOBAL"
npm config set prefix "$NPM_GLOBAL"
export PATH="$NPM_GLOBAL/bin:$PATH"
npm install -g @anthropic-ai/claude-code@latest

echo "Installing Deno..."
curl -fsSL https://deno.land/install.sh | sh
export DENO_INSTALL="/home/vscode/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

echo ""
echo "=== Installed versions ==="
deno --version
git --version
echo -n "claude " && claude --version 2>/dev/null || echo "claude: installed"

git config --global core.autocrlf input
git config --global init.defaultBranch main
git config --global --add safe.directory /workspaces/personal-site-2026

cat >> /home/vscode/.zshrc << 'ALIASES'

# User-owned npm global prefix (so `npm install -g` and the upgraded claude work without sudo)
export PATH="$HOME/.npm-global/bin:$PATH"

# Deno path
export DENO_INSTALL="/home/vscode/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

# Claude shortcut
alias c="claude"

# Deno/Fresh shortcuts
alias di="deno install"
alias dt="deno task"
alias check="deno task check"
alias fresh="deno run -A -r jsr:@fresh/init"

# Bring up the Fresh dev server (hot-reloading)
alias dev="bash /workspaces/personal-site-2026/.devcontainer/run.sh dev"
alias prod="bash /workspaces/personal-site-2026/.devcontainer/run.sh prod"

# Git shortcuts
alias gs="git status"
alias gd="git diff"
alias gl="git log --oneline -20"
ALIASES

echo ""
echo "Priming container-private node_modules (linux-native deps, separate from the host's macOS copy)..."
sudo chown vscode:vscode /workspaces/personal-site-2026/node_modules
( cd /workspaces/personal-site-2026 && deno install ) || echo "deno install incomplete; the dev server completes node_modules on start."

echo ""
echo "=== Setup complete ==="
echo "Run 'deno task check' to gate, 'dev' to start the Fresh dev server on :5273."
